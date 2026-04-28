import { useState } from "react";

import API from "../services/api";

import { useNavigate, Link } from "react-router-dom";

import "./auth.css";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",

        {
          email,
          password,
        },
      );

      localStorage.setItem(
        "token",

        res.data.token,
      );

      // Optional save user info

      localStorage.setItem(
        "user",

        JSON.stringify(res.data.user),
      );

      nav("/dashboard");
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <span className="auth-chip">Secure Access</span>
        <h1 className="auth-title">Sign in to your CRM dashboard</h1>
        <p className="auth-description">Use your email and password to continue.</p>

        <form className="mt-8 space-y-4" onSubmit={submit}>
          <input
            className="crm-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="crm-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="crm-button-primary w-full">
            Login
          </button>
        </form>

        <p className="auth-footer">
          No account?
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
