import { useNavigate } from "react-router-dom";

import "./topbar.css";

export default function Topbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();

    nav("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="crm-topbar">
      <div>
        <p className="crm-topbar__label">Workspace</p>
        <h2 className="crm-topbar__title">Welcome back, {user?.name || "User"}</h2>
      </div>

      <div className="crm-topbar__actions">
        <span className="crm-badge bg-brand-50 text-brand-700">
          Role: {user?.role || "sales"}
        </span>

        <button className="crm-button-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
