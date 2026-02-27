import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const Invoice = () => {
  const { id } = useParams(); // invoice id
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await API.get(`/admin/orders/${id}/invoice`);

        setInvoice(res.data.data);
      } catch (err) {
        console.error("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  if (loading) return <p>Loading invoice...</p>;
  if (!invoice) return <p>Invoice not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p className="text-sm text-gray-500">
            Invoice #: {invoice.invoiceNumber}
          </p>
          <p className="text-sm text-gray-500">
            Date: {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <h2 className="font-bold">Hardware Store</h2>
          <p>Kathmandu, Nepal</p>
          <p>support@hardware.com</p>
        </div>
      </div>

      {/* Customer */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Billed To:</h3>
        <p>{invoice.customer.name}</p>
        <p>{invoice.customer.email}</p>
        <p>{invoice.customer.phone}</p>
        <p>{invoice.customer.address}</p>
      </div>

      {/* Items */}
      <table className="w-full border mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Item</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 text-center">₹{item.price}</td>
              <td className="border p-2 text-center">{item.quantity}</td>
              <td className="border p-2 text-center">₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{invoice.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{invoice.tax}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{invoice.shipping}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Grand Total</span>
            <span>₹{invoice.grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded text-sm ${
            invoice.status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {invoice.status.toUpperCase()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => window.print()}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Print
        </button>

        <a
          href={`/api/invoices/${invoice._id}/pdf`}
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </a>

        <button
          onClick={() => navigate(-1)}
          className="border px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Invoice;
