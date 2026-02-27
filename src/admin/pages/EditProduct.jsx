import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { X } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

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
  const [newImages, setNewImages] = useState([]);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/categories");
      setCategories(res.data.data.categories);
    };
    fetchCategories();
  }, []);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/admin/products/${id}`);
        const product = res.data.data.product;

        setFormData({
          name: product.name || "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          category: product.category?._id || product.category || "",
          subcategory: product.subcategory || "",
          description: product.description || "",
          brand: product.brand || "",
          featured: product.featured || false,
          bestdeals: product.bestdeals || false,
        });

        setImages(product.images || []);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const selectedCategory = categories.find(
    (c) => c._id === formData.category
  );

  /* ================= DELETE IMAGE ================= */
  const handleDeleteImage = async (public_id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await API.delete(
        `/admin/products/${id}/images/${encodeURIComponent(public_id)}`
      );

      setImages((prev) =>
        prev.filter((img) => img.public_id !== public_id)
      );
    } catch {
      alert("Failed to delete image");
    }
  };

  /* ================= UPDATE PRODUCT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    newImages.forEach((file) =>
      payload.append("images", file)
    );

    try {
      await API.put(`/admin/products/${id}`, payload);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto space-y-4"
    >
      <h1 className="text-2xl font-bold">Edit Product</h1>

      {/* EXISTING IMAGES */}
      <div className="flex gap-4 flex-wrap">
        {images.map((img) => (
          <div key={img.public_id} className="relative">
            <img
              src={img.url}
              alt="product"
              className="w-24 h-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() =>
                handleDeleteImage(img.public_id)
              }
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* NEW IMAGES */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          setNewImages([...e.target.files])
        }
      />

      {/* NAME */}
      <input
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        placeholder="Name"
        required
      />

      {/* PRICE */}
      <input
        type="number"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
        placeholder="Price"
        required
      />

      {/* STOCK */}
      <input
        type="number"
        value={formData.stock}
        onChange={(e) =>
          setFormData({ ...formData, stock: e.target.value })
        }
        placeholder="Stock"
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
          {selectedCategory.subcategories?.map(
            (sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            )
          )}
        </select>
      )}

      {/* BRAND */}
      <input
        value={formData.brand}
        onChange={(e) =>
          setFormData({ ...formData, brand: e.target.value })
        }
        placeholder="Brand"
      />

      {/* DESCRIPTION */}
      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
        placeholder="Description"
        required
      />

      {/* BOOLEAN FIELDS */}
      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({
              ...formData,
              featured: e.target.checked,
            })
          }
        />
        Featured
      </label>

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={formData.bestdeals}
          onChange={(e) =>
            setFormData({
              ...formData,
              bestdeals: e.target.checked,
            })
          }
        />
        Best Deals
      </label>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() =>
            navigate("/admin/products")
          }
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
