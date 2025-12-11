// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase_client";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

// ---------------------- Admin Sign In ----------------------
const AdminSignIn = ({ onAdminLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) onAdminLogin();
    };
    checkSession();
  }, [onAdminLogin]);

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check if the user is an admin
      const { data: adminCheck } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (!adminCheck) {
        setErrorMsg("Unauthorized: Admin access denied");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      onAdminLogin();
    } catch (err) {
      setErrorMsg(err.message || "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-red-200">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Admin Sign In</h1>
        <p className="text-gray-500 mb-6">Enter your admin credentials</p>
        {errorMsg && <div className="text-red-600 mb-4">{errorMsg}</div>}
        <form onSubmit={handleAdminSignIn} className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border border-red-200 focus:border-red-500"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border border-red-200 focus:border-red-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ---------------------- Admin Dashboard ----------------------
const AdminDashboard = ({ onLogout }) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    is_featured: true,
    category: "",
    available: true,
    position: 0,
  });

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  const fetchFeaturedItems = async () => {
    try {
      const { data, error } = await supabase.from("featured_dishes").select("*").order("id", {
        ascending: false,
      });
      if (error) throw error;
      setFeaturedItems(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await supabase.from("featured_dishes").update({
          ...formData,
          price: parseFloat(formData.price),
          position: parseInt(formData.position || 0, 10),
        }).eq("id", editingItem.id);
      } else {
        await supabase.from("featured_dishes").insert([{
          ...formData,
          price: parseFloat(formData.price),
          position: parseInt(formData.position || 0, 10),
        }]);
      }
      setFormData({ name: "", description: "", price: "", image_url: "", is_featured: true, category: "", available: true, position: 0 });
      setEditingItem(null);
      setShowForm(false);
      fetchFeaturedItems();
    } catch (error) {
      console.error(error);
      alert("Error saving item");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item, price: item.price.toString() });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this item?")) {
      await supabase.from("featured_dishes").delete().eq("id", id);
      fetchFeaturedItems();
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
        <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
      </div>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded mb-4 flex items-center gap-2 hover:bg-red-700"
        >
          <PlusIcon className="w-4 h-4" /> Add New Dish
        </button>
      )}

      {showForm && (
        <form onSubmit={handleAddOrUpdate} className="bg-white p-4 rounded shadow mb-4 space-y-4 border border-red-200">
          <input type="text" name="name" placeholder="Dish Name" value={formData.name} onChange={handleFormChange} required className="w-full px-3 py-2 border border-red-200 rounded focus:border-red-500" />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleFormChange} required className="w-full px-3 py-2 border border-red-200 rounded focus:border-red-500" />
          <input type="url" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleFormChange} required className="w-full px-3 py-2 border border-red-200 rounded focus:border-red-500" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleFormChange} className="w-full px-3 py-2 border border-red-200 rounded focus:border-red-500" />
          <div className="flex gap-4 items-center">
            <label>
              <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleFormChange} /> Featured
            </label>
            <label>
              <input type="checkbox" name="available" checked={formData.available} onChange={handleFormChange} /> Available
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">{editingItem ? "Update" : "Add"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-x-auto border border-red-200">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-red-50">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {featuredItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-red-50">
                  <td><img src={item.image_url} alt={item.name} className="h-12 w-12 object-cover rounded" /></td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.available ? "Yes" : "No"}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="text-red-600 hover:text-red-800">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// ---------------------- Main Dashboard Component ----------------------
export default function Dashboard() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => setAdminLoggedIn(true);
  const handleAdminLogout = () => setAdminLoggedIn(false);

  if (adminLoggedIn) return <AdminDashboard onLogout={handleAdminLogout} />;

  return <AdminSignIn onAdminLogin={handleAdminLogin} />;
}
