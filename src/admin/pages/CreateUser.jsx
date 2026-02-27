import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const CreateUser = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await API.post("/admin/users", formData);
      navigate("/admin/users");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create user"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create User</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        required
      />

      <input
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) =>
          setFormData({ ...formData, lastName: e.target.value })
        }
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        required
      />

      <select
        value={formData.role}
        onChange={(e) =>
          setFormData({ ...formData, role: e.target.value })
        }
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        disabled={saving}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Create User"}
      </button>
    </form>
  );
};

export default CreateUser;
