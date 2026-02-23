import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "220px",
        minHeight: "100vh",
      }}>
      <h4 className="mb-4">CRM</h4>

      <Link to="/dashboard" className="d-block text-white my-2">
        Dashboard
      </Link>

      <Link to="/leads" className="d-block text-white my-2">
        Leads
      </Link>

      <Link to="/deals" className="d-block text-white my-2">
        Deals
      </Link>

      <Link to="/activities" className="d-block text-white my-2">
        Activities
      </Link>
    </div>
  );
}
