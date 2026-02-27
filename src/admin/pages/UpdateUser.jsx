import { useEffect, useState } from "react";
import API from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUser(res.data.data.user);
      } catch (err) {
        alert("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/admin/users/${id}`, user);
    navigate("/admin/users");
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input name="firstName" value={user.firstName} onChange={handleChange} />
      <input name="lastName" value={user.lastName} onChange={handleChange} />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Update User
      </button>
    </form>
  );
};

export default UpdateUser;
