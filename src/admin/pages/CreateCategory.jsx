import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    nameNepali: "",
    icon: "",
    subcategories: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("nameNepali", form.nameNepali);
      payload.append("icon", form.icon);
     payload.append(
  "subcategories",
  JSON.stringify(
    form.subcategories
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => ({ name: s }))   // ✅ FIX HERE
  )
);

      
      if (imageFile) payload.append("image", imageFile);

      await API.post("/admin/categories", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category created successfully");
      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
      setError("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="nameNepali"
          placeholder="Nepali Name"
          value={form.nameNepali}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="icon"
          placeholder="Icon (emoji or text)"
          value={form.icon}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        <textarea
          name="subcategories"
          placeholder="Subcategories (comma separated)"
          value={form.subcategories}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={3}
        />

        <button
          disabled={loading}
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
