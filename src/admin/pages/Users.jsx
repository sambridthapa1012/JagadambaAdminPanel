import { useEffect, useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data.data.users || []);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  const handleDelete = async (id) => {
  if (!window.confirm("Deactivate this user?")) return;
  await API.delete(`/admin/users/${id}`);
  setUsers(users.filter(u => u._id !== id));
};


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Users ({users.length})
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last Logged In</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "Never"}
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                 <td className="flex gap-3 justify-end p-3">
                                <button onClick={() => navigate(`/admin/users/${user._id}/update`)}>
                                  <Pencil size={18} />
                                </button>
                                <button onClick={() => handleDelete(user._id)}>
                                  <Trash2 size={18} />
                                </button>
                              </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
