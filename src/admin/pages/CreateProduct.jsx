import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    subcategory: "",
    description: "",
    brand: "",
    featured: false,
    bestdeals: false,
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/categories");
      setCategories(res.data.data.categories);
    };
    fetchCategories();
  }, []);

  const selectedCategory = categories.find(
    (c) => c._id === formData.category
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = new FormData();

    Object.entries(formData).forEach(([k, v]) =>
      payload.append(k, v)
    );

    images.forEach((file) => payload.append("images", file));

    try {
      await API.post("/admin/products", payload);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Product</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        required
      />

      <input
        type="number"
        placeholder="Price"
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
        required
      />

      <input
        type="number"
        placeholder="Stock"
        onChange={(e) =>
          setFormData({ ...formData, stock: e.target.value })
        }
        required
      />

      {/* CATEGORY */}
      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
            subcategory: "",
          })
        }
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* SUBCATEGORY */}
      {selectedCategory && (
        <select
          value={formData.subcategory}
          onChange={(e) =>
            setFormData({
              ...formData,
              subcategory: e.target.value,
            })
          }
        >
          <option value="">Select Subcategory</option>
          {selectedCategory.subcategories.map((sub, i) => (
            <option key={i} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}

      <input
        placeholder="Brand"
        onChange={(e) =>
          setFormData({ ...formData, brand: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />

      {/* BOOLEAN FIELDS */}
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
        />
        Featured
      </label>

      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setFormData({ ...formData, bestdeals: e.target.checked })
          }
        />
        Best Deals
      </label>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages([...e.target.files])}
      />

      <button disabled={saving} className="bg-orange-600 text-white px-4 py-2 rounded">
        {saving ? "Saving..." : "Create Product"}
      </button>
    </form>
  );
};

export default CreateProduct;
