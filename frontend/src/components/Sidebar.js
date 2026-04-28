import { NavLink } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar() {
  const navItemClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "sidebar-link-active" : ""}`;

  return (
    <aside className="crm-sidebar">
      <div className="crm-sidebar__brand">
        <div className="crm-sidebar__logo">C</div>
        <div>
          <p className="crm-sidebar__eyebrow">Standard CRM</p>
          <h1 className="crm-sidebar__title">Control Center</h1>
        </div>
      </div>

      <nav className="crm-sidebar__nav">
        <NavLink to="/dashboard" className={navItemClass}>
          Dashboard
        </NavLink>
        <NavLink to="/leads" className={navItemClass}>
          Leads
        </NavLink>
        <NavLink to="/deals" className={navItemClass}>
          Deals
        </NavLink>
        <NavLink to="/activities" className={navItemClass}>
          Activities
        </NavLink>
        <NavLink to="/users" className={navItemClass}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
}
