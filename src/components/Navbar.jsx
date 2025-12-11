import React from "react";
import { useCart } from "../context/useCart.jsx";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase_client";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { cartItems, isSidebarOpen, setSidebarOpen, removeFromCart, user, isAdmin } =
    useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLoginLogout = async () => {
    if (user) {
      await supabase.auth.signOut();
      window.location.reload();
    } else {
      navigate("/auth");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-red-50/80 backdrop-blur-md shadow-md">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <a href="/" className="text-2xl font-extrabold text-red-700">
            DELIVERY<span className="text-red-900 text-3xl">.</span>
          </a>

          <div className="flex items-center space-x-4">
               {user && isAdmin && (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-red-700 hover:text-red-900 font-semibold px-3 py-1 transition"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={handleLoginLogout}
              className="text-white bg-red-600 hover:bg-red-700 font-semibold px-3 py-1 rounded transition"
            >
              {user ? "Logout" : "Login"}
            </button>

            <button
              className="relative text-red-700"
              onClick={() => setSidebarOpen(true)}
            >
              <ShoppingCartIcon className="w-8 h-8" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute -top-1 -right-1 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-80 bg-red-50 shadow-xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-red-200">
              <h2 className="text-lg font-bold text-red-700">Your Cart</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-red-700" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {cartItems.length === 0 && (
                <p className="text-red-500">Your cart is empty.</p>
              )}

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <p className="font-semibold text-red-800">
                      {item.featured_dishes.name}
                    </p>
                    <p className="text-sm text-red-600">
                      Quantity: {item.quantity} • $
                      {item.featured_dishes.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-red-200">
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
