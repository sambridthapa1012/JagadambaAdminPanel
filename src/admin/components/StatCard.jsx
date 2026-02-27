import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,      // ✅ renamed correctly
  change,
  isPositive = true,
  color = "orange",
}) => {

  // ✅ Safe Tailwind color map
  const colorClasses = {
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {value}
          </h2>
        </div>

        {/* ✅ Icon wrapper (safe) */}
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={22} />
          </div>
        )}
      </div>

      {/* Bottom Row */}
      {change && (
        <div className="flex items-center gap-2 mt-4 text-sm">
          {isPositive ? (
            <TrendingUp size={16} className="text-green-600" />
          ) : (
            <TrendingDown size={16} className="text-red-600" />
          )}

          <span
            className={`font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </span>

          <span className="text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
