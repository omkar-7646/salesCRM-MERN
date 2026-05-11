import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken } from "../services/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getAuthToken();

  return token ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
