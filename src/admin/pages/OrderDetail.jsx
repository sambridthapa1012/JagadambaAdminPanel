import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data.data.order);
      } catch {
        alert("Order not found");
        navigate("/admin/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) return <p>Loading order...</p>;
  if (!order) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order Details</h1>

      {/* USER INFO */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Customer</h2>
        <p>{order.shippingInfo.fullName}</p>
        <p>{order.shippingInfo.email}</p>
        <p>{order.shippingInfo.phone}</p>
      </div>

      {/* ITEMS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Items</h2>

        {order.orderItems.map((item) => (
          <div key={item._id} className="flex gap-4 border-b py-3">
            <img
              src={item.image || "/placeholder.png"}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Rs {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT */}
      <div className="bg-white p-4 rounded shadow">
        <p>Total: <strong>Rs {order.totalPrice}</strong></p>
        <p>Status: {order.orderStatus}</p>
        <p>Payment: {order.paymentMethod}</p>
      </div>

      {/* CANCELLATION */}
      {order.orderStatus === "cancelled" && (
        <div className="bg-red-50 p-4 rounded shadow">
          <h2 className="font-semibold text-red-600">
            Cancellation Details
          </h2>
          <p>Reason: {order.cancellationReason}</p>
          <p>
            Cancelled At:{" "}
            {new Date(order.cancelledAt).toLocaleString()}
          </p>
        </div>
      )}
      <button
  onClick={() => navigate(`admin/invoices/${id}`)}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  View Invoice
</button>

    </div>
  );
};

export default OrderDetail;
