import { useEffect, useState } from "react";

import API from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function Users() {
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="mb-1">Users</h3>
          <p className="text-muted mb-0">All users with their role</p>
        </div>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div className="col-md-6 col-lg-4" key={user._id}>
              <div className="card shadow-sm p-3 my-2">
                <h5 className="mb-1">{user.name}</h5>
                <p className="text-muted mb-2">{user.email}</p>
                <span className="badge bg-primary text-uppercase">
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
