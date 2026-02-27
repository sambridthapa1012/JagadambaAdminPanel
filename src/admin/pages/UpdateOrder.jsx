import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { Pencil, Trash2 } from "lucide-react";

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/admin/orders/${id}`);
        setOrder(res.data.data.order);
        setStatus(res.data.data.order.orderStatus);
      } catch (err) {
        alert("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await API.put(`/admin/orders/${id}/status`, {
        orderStatus: status,
      });

      alert("Order updated successfully");
      navigate("/admin/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };
 
  

  if (loading) return <p>Loading...</p>;
  if (!order) return <p className="text-red-500">Order not found</p>;

  return (
    


    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        Update Order #{order._id.slice(-6)}
      </h1>

      <label className="block mb-2 font-medium">Order Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <div className="flex gap-3">
        <button
          onClick={handleUpdate}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Update Order
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateOrder;
