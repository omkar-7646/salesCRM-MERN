import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

import "./dashboard-layout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="crm-shell">
      <Sidebar />

      <div className="crm-shell__main">
        <Topbar />

        <main className="crm-shell__content">{children}</main>
      </div>
    </div>
  );
}
