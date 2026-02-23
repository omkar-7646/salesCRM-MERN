import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();

    nav("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-success text-white d-flex justify-content-between p-2">
      <h5>
        Welcome {user?.name}({user?.role})
      </h5>

      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
