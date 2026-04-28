import { useState } from "react";

import API from "../services/api";

import { useNavigate, Link } from "react-router-dom";

import "./auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("sales");

  const [loading, setLoading] = useState(false);

  // REGISTER FUNCTION

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <span className="auth-chip">New Workspace User</span>
        <h1 className="auth-title">Create your CRM account</h1>
        <p className="auth-description">Set up your profile and choose the right access level.</p>

        <form className="mt-8 space-y-4" onSubmit={submit}>
          <input
            type="text"
            className="crm-input"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="crm-input"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="crm-input"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <label className="crm-label">Register As</label>
            <select
              className="crm-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="sales">Sales Team (User)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="crm-button-primary w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
