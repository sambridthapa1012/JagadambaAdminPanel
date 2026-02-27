import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";

const CancellationReason = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data.data.order);
      } catch (err) {
        alert("Failed to load order");
        navigate("/admin/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const handleCancel = async () => {
    if (!reason.trim()) {
      alert("Please provide cancellation reason");
      return;
    }

    try {
      await API.put(`/orders/${id}/cancel`, {
        cancellationReason: reason,
      });

      navigate("/admin/orders");
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  if (loading) return <p className="pt-20">Loading...</p>;
  if (!order) return null;

  return (
    <div className="pt-20 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-xl font-bold mb-4 text-red-600">
          Cancellation Reason
        </h1>

        {/* Order Info */}
        <div className="mb-4 space-y-1">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Customer:</strong> {order.user?.name}</p>
          <p><strong>Email:</strong> {order.user?.email}</p>
          <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Order Items */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Items</h2>
          {order.orderItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-2">
              <span>{item.name} × {item.quantity}</span>
              <span>Rs {item.price}</span>
            </div>
          ))}
        </div>

        {/* Reason */}
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for cancellation"
          className="w-full border rounded p-3 mb-4"
          rows={4}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>

          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancellationReason;
