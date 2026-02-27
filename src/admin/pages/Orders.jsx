import { useEffect, useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye, XCircle } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/admin/orders");
        setOrders(res.data.data.orders || []);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🗑 PERMANENT DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Permanently delete this order?")) return;

    try {
      await API.delete(`/admin/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      alert("Failed to delete order");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">
                  {order.shippingInfo?.fullName || "Guest"}
                </td>
                <td>{order.shippingInfo?.email}</td>
                <td>Rs {order.totalPrice}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.orderStatus === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td>{order.paymentMethod}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td className="flex gap-3 justify-end p-3">
                  {/* VIEW */}
                  <button
                    onClick={() =>
                      navigate(`/admin/orders/${order._id}`)
                    }
                  >
                    <Eye size={18} />
                  </button>

                  {/* UPDATE */}
                  <button
                    onClick={() =>
                      navigate(`/admin/orders/${order._id}/update`)
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  {/* CANCEL */}
                  {order.orderStatus !== "cancelled" && (
                    <button
                      onClick={() =>
                        navigate(`/admin/orders/${order._id}/cancel`)
                      }
                    >
                      <XCircle size={18} />
                    </button>
                  )}

                  {/* DELETE */}
                  <button onClick={() => handleDelete(order._id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
