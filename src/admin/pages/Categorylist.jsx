import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { Pencil, Trash2 } from "lucide-react";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(res.data.data.categories || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await API.delete(`/admin/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Categories ({categories.length})
        </h1>

        <button
          onClick={() => navigate("/admin/categories/create")}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Nepali</th>
            <th>Subcategories</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id} className="border-t">
              <td className="p-3">
                <img
                  src={c.image?.url || "/placeholder.png"}
                  className="w-14 h-14 object-cover rounded"
                />
              </td>
              <td>{c.name}</td>
              <td>{c.nameNepali || "-"}</td>
              <td>{c.subcategories?.length || 0}</td>
              <td className="flex gap-3 justify-end p-3">
                <button onClick={() => navigate(`/admin/categories/${c._id}/edit`)}>
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(c._id)}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
