import { useEffect, useState } from "react";

import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./users.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      alert("Failed loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="crm-page-title">Users</h1>
        <p className="crm-page-subtitle">
          All users and their assigned role inside the CRM workspace.
        </p>
      </div>

      {loading ? (
        <div className="crm-empty">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="crm-empty">No users found.</div>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <article className="crm-card user-card" key={user._id}>
              <h2 className="user-card__name">{user.name}</h2>
              <p className="user-card__email">{user.email}</p>
              <span className="crm-badge bg-brand-50 text-brand-700">{user.role}</span>
            </article>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
