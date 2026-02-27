import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    nameNepali: "",
  });

  const [subcategories, setSubcategories] = useState([]);
  const [newSub, setNewSub] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- FETCH CATEGORY ---------------- */
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await API.get(`/admin/categories/${id}`);
        const category = res.data.data.category;

        setForm({
          name: category.name,
          nameNepali: category.nameNepali || "",
        });

setSubcategories(
  Array.isArray(category.subcategories)
    ? category.subcategories
    : []
);
        setPreview(category.image?.url || "");
      } catch {
        alert("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  /* ---------------- SUBCATEGORY HANDLERS ---------------- */

  const handleSubChange = (index, value) => {
    const updated = [...subcategories];
    updated[index].name = value;
    setSubcategories(updated);
  };

  const handleAddSub = () => {
    if (!newSub.trim()) return;
    setSubcategories([...subcategories, { name: newSub }]);
    setNewSub("");
  };

  const handleRemoveSub = (index) => {
    const updated = subcategories.filter((_, i) => i !== index);
    setSubcategories(updated);
  };

  /* ---------------- HANDLE UPDATE ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("nameNepali", form.nameNepali);
    payload.append("subcategories", JSON.stringify(subcategories));

    if (image) payload.append("image", image);

    try {
      await API.put(`/admin/categories/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/categories");
    } catch {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Update Category</h1>

      {/* CATEGORY NAME */}
      <input
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        placeholder="Category Name"
      />

      <input
        className="w-full border p-2 rounded"
        value={form.nameNepali}
        onChange={(e) => setForm({ ...form, nameNepali: e.target.value })}
        placeholder="Nepali Name"
      />

      {/* IMAGE */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {/* SUBCATEGORIES */}
      <div>
        <h3 className="font-semibold mt-4 mb-2">Subcategories</h3>

        {subcategories.map((sub, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={sub}
              onChange={(e) =>
                handleSubChange(index, e.target.value)
              }
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveSub(index)}
              className="bg-red-500 text-white px-3 rounded"
            >
              X
            </button>
          </div>
        ))}

        {/* ADD NEW SUB */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newSub}
            onChange={(e) => setNewSub(e.target.value)}
            placeholder="New subcategory"
            className="flex-1 border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAddSub}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <button
        disabled={saving}
        className="bg-green-600 text-white py-2 rounded w-full"
      >
        {saving ? "Saving..." : "Update Category"}
      </button>
    </form>
  );
};

export default UpdateCategory;
