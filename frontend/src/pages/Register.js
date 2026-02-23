import { useState } from "react";

import API from "../services/api";

import { useNavigate, Link } from "react-router-dom";

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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",

        background: "linear-gradient(135deg,#ff9966,#ff5e62)",
      }}>
      <div
        className="card shadow-lg p-5"
        style={{
          width: "420px",

          borderRadius: "15px",
        }}>
        <h3 className="text-center mb-4 text-dark">Create Account</h3>

        <form onSubmit={submit}>
          {/* NAME */}

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE */}

          <label className="fw-bold">Register As</label>

          <select
            className="form-select mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}>
            <option value="sales">Sales Team (User)</option>

            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <hr />

        <p className="text-center">
          Already have account ?
          <Link to="/login" className="ms-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
