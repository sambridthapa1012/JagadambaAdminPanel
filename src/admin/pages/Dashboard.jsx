import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios"; // 👈 REQUIRED
import StatCard from "../components/StatCard";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://jagadamba-backend-cdzs.vercel.app/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(res.data.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchStats();
  }, [token]);

  if (!token) return <p>Please login as admin</p>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Orders" value={stats.totalOrders} icon={ShoppingCart} />
        <StatCard title="Users" value={stats.totalUsers} icon={Users} />
        <StatCard title="Products" value={stats.totalProducts} icon={Package} />
        <StatCard title="Revenue" value={`₹ ${stats.revenue}`} icon={DollarSign} />
        <div className="grid grid-cols-5 gap-10 col-span-4">
     
       <StatCard title="Cancelled Orders" value={stats.cancelledOrders} />
       {/* <div className="bg-white p-4 rounded shadow">
  <h2 className="font-semibold mb-3">Top Cancellation Reasons</h2>

  {stats.cancellationReasons.map((r) => (
    <div key={r._id} className="flex justify-between border-b py-2">
      <span>{r._id}</span>
      <span className="font-bold">{r.count}</span>
    </div>
  ))}
</div> */}

</div>
      </div>
    </div>
  );
};

export default Dashboard;
