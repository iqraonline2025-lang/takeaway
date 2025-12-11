import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../supabase_client";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
      checkAdminStatus();
    } else {
      setCartItems([]);
      setIsAdmin(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;
    try {
      // Check if user is admin@example.com
      if (user.email === "admin@example.com") {
        setIsAdmin(true);
        return;
      }

      // Check admin_users table
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const fetchCart = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("cart")
        .select("*, featured_dishes(*)")
        .eq("user_id", user.id);
      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (dishId, quantity = 1) => {
    if (!user) return;
    try {
      const existingItem = cartItems.find((item) => item.dish_id === dishId);
      if (existingItem) {
        await supabase
          .from("cart")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id);
      } else {
        await supabase.from("cart").insert([
          {
            user_id: user.id,
            dish_id: dishId,
            quantity,
          },
        ]);
      }
      fetchCart();
      setSidebarOpen(true); // Open sidebar after adding to cart
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await supabase.from("cart").delete().eq("id", cartId);
      fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    try {
      await supabase.from("cart").update({ quantity }).eq("id", cartId);
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await supabase.from("cart").delete().eq("user_id", user.id);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isSidebarOpen,
        setSidebarOpen,
        user,
        fetchCart,
        isAdmin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
