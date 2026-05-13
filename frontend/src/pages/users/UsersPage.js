import { useEffect, useState } from "react";

import API from "../../services/api";
import { getCurrentUser } from "../../services/auth";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./users.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

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

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name}?`)) return;

    try {
      await API.delete(`/users/${user._id}`);
      setUsers((currentUsers) => currentUsers.filter((item) => item._id !== user._id));
    } catch (error) {
      alert(error.response?.data || "Failed deleting user");
    }
  };

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
              <div>
                <h2 className="user-card__name">{user.name}</h2>
                <p className="user-card__email">{user.email}</p>
              </div>

              <div className="user-card__actions">
                <span className="crm-badge bg-brand-50 text-brand-700">{user.role}</span>
                <button
                  className="crm-button-danger"
                  disabled={currentUser?._id === user._id}
                  onClick={() => deleteUser(user)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
