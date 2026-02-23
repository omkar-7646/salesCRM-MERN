import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-5">
        <h1 className="text-primary">Sales CRM System</h1>

        <p className="lead">Manage Clients Deals Activities Easily.</p>

        <Link to="/login">
          <button className="btn btn-primary">Login Now</button>
        </Link>
      </div>
    </div>
  );
}
