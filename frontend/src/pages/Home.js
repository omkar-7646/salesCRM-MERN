import { Link } from "react-router-dom";

import "./auth.css";

export default function Home() {
  return (
    <div className="auth-shell auth-shell-home">
      <div className="auth-panel auth-panel-wide">
        <div className="auth-copy">
          <span className="auth-chip">Purple CRM Workspace</span>
          <h1 className="auth-title">Sales CRM built for clear pipelines and fast teamwork.</h1>
          <p className="auth-description">
            Track leads, move deals, log activities, and manage users from one clean control center.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="crm-button-primary">
              Login Now
            </Link>

            <Link to="/register" className="crm-button-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
