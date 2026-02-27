import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { Pencil, Trash2 } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/admin/products");
        setProducts(res.data.data.products || []);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/admin/products/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Products ({products.length})
        </h1>
       
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-3 flex gap-3 items-center">
                <img
                  src={p.images?.[0]?.url || "/placeholder.png"}
                  className="w-12 h-12 rounded object-cover"
                />
                <span>{p.name}</span>
              </td>
              <td>Rs {p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td className="flex gap-3 justify-end p-3">
                <button onClick={() => navigate(`/admin/products/${p._id}/edit`)}>
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(p._id)}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
         
      </table>
      <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
    </div>
  );
};

export default Products;
