import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabase_client";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const countryCodes = {
  "United Kingdom": "GB",
  "United States": "US",
  "Egypt": "EG",
  "Canada": "CA",
  "Australia": "AU",
};

function CheckoutForm() {
  const { cartItems, user, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [billing, setBilling] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const cleanNumber = (n) => Number.isFinite(Number(n)) ? Number(n) : 0;

  const itemsForPayment = useMemo(
    () =>
      (cartItems || []).map((item) => {
        const price = cleanNumber(item?.featured_dishes?.price);
        const quantity = Math.max(1, Math.floor(cleanNumber(item?.quantity)));
        return {
          id: item?.dish_id || item?.id,
          name: item?.featured_dishes?.name || "Item",
          price,
          quantity,
        };
      }),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => itemsForPayment.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [itemsForPayment]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling((b) => ({ ...b, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!billing.name || !billing.email || !billing.address) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!user?.id) {
      setErrorMsg("Please sign in before checking out.");
      return;
    }

    if (!stripe || !elements) {
      setErrorMsg("Stripe is not loaded yet. Try again in a moment.");
      return;
    }

    if (!itemsForPayment.length || totalPrice <= 0) {
      setErrorMsg("Your cart is empty or total is invalid.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMsg("Payment element not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const billingForStripe = {
        ...billing,
        country: countryCodes[billing.country] || billing.country,
      };

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: itemsForPayment,
          user_id: user.id,
          billing: billingForStripe,
        },
      });

      if (error) throw new Error(error.message || "Failed to create payment intent.");
      const clientSecret = data?.clientSecret;
      if (!clientSecret) throw new Error("No client secret returned.");

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: billingForStripe.name,
            email: billingForStripe.email,
            address: {
              line1: billingForStripe.address,
              city: billingForStripe.city || undefined,
              postal_code: billingForStripe.postalCode || undefined,
              country: billingForStripe.country || undefined,
            },
          },
        },
      });

      if (paymentResult.error) {
        setErrorMsg(paymentResult.error.message || "Payment failed. Please try again.");
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        clearCart();
        navigate("/order-success");
      } else {
        setErrorMsg("Payment not completed. Please try again.");
      }
    } catch (err) {
      setErrorMsg(err?.message || "An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-red-50 items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-red-800 text-center mb-6">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-8 p-4 bg-red-50 rounded-lg">
          <h3 className="text-xl font-semibold text-red-800 mb-4">Order Summary</h3>
          <div className="space-y-2">
            {itemsForPayment.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-red-700">{item.name} (x{item.quantity})</span>
                <span className="font-semibold text-red-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-red-200 pt-2 mt-4">
              <div className="flex justify-between items-center text-lg font-bold text-red-800">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {errorMsg && <p className="text-red-700 text-center font-semibold">{errorMsg}</p>}

          {/* Billing Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={billing.name}
              onChange={handleChange}
              className="border border-red-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={billing.email}
              onChange={handleChange}
              className="border border-red-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={billing.address}
              onChange={handleChange}
              className="border border-red-300 p-3 rounded w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              name="city"
              placeholder="City"
              value={billing.city}
              onChange={handleChange}
              className="border border-red-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              value={billing.postalCode}
              onChange={handleChange}
              className="border border-red-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              name="country"
              placeholder="Country (e.g., GB)"
              value={billing.country}
              onChange={handleChange}
              className="border border-red-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Card Input */}
          <div className="border border-red-200 p-4 rounded bg-gray-50">
            <CardElement options={{ hidePostalCode: true }} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl transition text-lg disabled:opacity-60 shadow-md font-semibold"
          >
            {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
