import { useNavigate, useParams } from "react-router-dom";

const CancelOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4">
      <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-xl font-bold mb-4 text-red-600">
          Cancel Order
        </h1>

        <p className="mb-6">
          Are you sure you want to cancel this order?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="px-4 py-2 border rounded"
          >
            No
          </button>

          <button
            onClick={() => navigate(`/admin/orders/${id}/cancel-reason`)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Yes, Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
