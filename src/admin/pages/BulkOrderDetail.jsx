import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const BulkOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/bulk-orders`);
        const found = res.data.data.find((o) => o._id === id);
        setOrder(found);
      } catch {
        setError("Failed to load bulk order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>Bulk order not found</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bulk Order Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white shadow rounded p-6 space-y-4">
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Email:</strong> {order.email || "—"}</p>
        <p><strong>Company:</strong> {order.company || "—"}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize">{order.status}</span>
        </p>

        <p>
          <strong>Created At:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        <div>
          <strong>Products:</strong>
          <ul className="list-disc ml-6 mt-2">
            {order.products.map((p) => (
              <li key={p._id}>
                {p.product?.name || "Deleted Product"} × {p.quantity}
              </li>
            ))}
          </ul>
        </div>

        {order.message && (
          <div>
            <strong>Message:</strong>
            <p className="mt-1 text-gray-700">{order.message}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(`/admin/bulk-orders/${order._id}/edit`)}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Edit Status
      </button>
    </div>
  );
};

export default BulkOrderDetail;
