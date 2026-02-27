import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const EditBulkOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/bulk-orders`);
        const order = res.data.data.find((o) => o._id === id);
        setStatus(order?.status || "pending");
      } catch {
        setError("Failed to load bulk order");
      }
    };

    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await API.put(`/bulk-orders/${id}`, { status });
      navigate(`/admin/bulk-orders/${id}`);
    } catch {
      setError("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4"
    >
      <h1 className="text-2xl font-bold">Update Bulk Order Status</h1>

      {error && <p className="text-red-500">{error}</p>}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="pending">Pending</option>
        <option value="contacted">Contacted</option>
        <option value="quoted">Quoted</option>
        <option value="completed">Completed</option>
      </select>

      <button
        disabled={saving}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Update Status"}
      </button>
    </form>
  );
};

export default EditBulkOrder;
