import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Category = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categoriesss, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const API_BASE = import.meta.env.VITE_BASE_URL;
  const UPLOAD_BASE =
    import.meta.env.VITE_UPLOAD_URL || "http://localhost:3000/uploads";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/categories`);
      setCategories(res.data);
      console.log("Fetched categories:", res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleEdit = (category) => {
    setName(category.name);
    setPreview(category.image); // this is the filename returned from backend
    setEditingId(category._id);
    setImage(null); // reset file input
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (name) formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        // === UPDATE Mode ===
        if (!name && !image) {
          return alert("Please update either the name or the image.");
        }

        const confirmed = window.confirm(
          "Are you sure you want to update this category?"
        );
        if (!confirmed) return;

        await axios.put(`${API_BASE}/categories/${editingId}`, formData);
        toast.success("✅ Category updated successfully!");
        setEditingId(null);
      } else {
        // === CREATE Mode ===
        if (!name || !image) {
          return alert("Both name and image are required.");
        }

        await axios.post(`${API_BASE}/categories`, formData);
        toast.success("📦 Category created successfully!");
      }

      // ✅ Clear form and refresh
      setName("");
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchCategories();
    } catch (err) {
      console.error("Error submitting category:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`${API_BASE}/categories/${id}`);
      toast.success("🗑️ Category deleted successfully!");
      fetchCategories(); // Refresh the list
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("❌ Failed to delete category.");
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Category</h2>
      {editingId && (
        <p className="text-yellow-600 mb-2 text-sm">
          ✏️ Editing Category (ID: {editingId})— select a new image to replace
          the old one.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          // onChange={handleImageChange}
          onChange={(e) => setImage(e.target.files[0])}
          ref={fileInputRef}
          className="w-full"
        />
        {editingId && (
          <p className="text-sm text-yellow-600 mt-1">
            Please select a new image to update this category.
          </p>
        )}
        {(image || preview) && (
          <img
            src={
              preview?.startsWith("http")
                ? preview
                : `${UPLOAD_BASE}/${preview}`
            }
            alt="Preview"
            className="w-32 h-32 object-cover"
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">All Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesss.map((cat) => (
            <div key={cat._id} className="border p-3 rounded shadow">
              <img
                src={`${UPLOAD_BASE}/${cat.image}`}
                alt={cat.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <p className="text-center font-medium">{cat.name}</p>
              <button
                onClick={() => {
                  setName(cat.name);
                  setEditingId(cat._id);
                  setPreview(`${UPLOAD_BASE}/${cat.image}`);
                }}
                className="bg-yellow-500 text-white mr-4 px-2 py-1 rounded text-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-500 text-white px-2 py-1 text-center rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
