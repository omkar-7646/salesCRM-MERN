import { useState } from "react";

import API from "../services/api";

import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const submit = async () => {
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",

        background: "linear-gradient(120deg,#2980b9,#6dd5fa)",
      }}>
      <div className="card p-5 shadow-lg" style={{ width: "420px" }}>
        <h3 className="text-center text-primary">CRM Login</h3>

        <input
          className="form-control my-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control my-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={submit}>
          Login
        </button>

        <hr />

        <p className="text-center">
          No account ?<Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}
