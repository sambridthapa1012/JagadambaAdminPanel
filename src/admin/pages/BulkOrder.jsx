import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { Eye, Pencil, Trash2 } from "lucide-react";

const BulkOrders = () => {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBulkOrders = async () => {
      try {
        const res = await API.get("/bulk-orders");
        setBulkOrders(res.data.data || []);
      } catch (err) {
        setError("Failed to load bulk orders");
      } finally {
        setLoading(false);
      }
    };

    fetchBulkOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bulk order?")) return;

    try {
      await API.delete(`/bulk-orders/${id}`);
      setBulkOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      alert("Failed to delete bulk order");
    }
  };

  if (loading) return <p>Loading bulk orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Bulk Orders ({bulkOrders.length})
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Customer</th>
              <th>Contact</th>
              <th>Items</th>
              <th>Total Qty</th>
              <th>Status</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {bulkOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3 font-medium">
                  {order.customerName}
                </td>

                <td>
                  {order.company || order.email || "—"}
                </td>

                <td>
                  {order.products.map((p) => (
                    <div key={p._id}>
                      {p.product?.name || "Product deleted"}
                    </div>
                  ))}
                </td>

                <td>
                  {order.products.reduce(
                    (sum, p) => sum + p.quantity,
                    0
                  )}
                </td>

                <td className="capitalize">
                  {order.status}
                </td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="flex gap-3 justify-end p-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/bulk-orders/${order._id}`)
                    }
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin/bulk-orders/${order._id}/edit`)
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(order._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bulkOrders.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No bulk orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default BulkOrders;
