import { Navigate } from "react-router-dom";
import { getAuthToken } from "../services/auth";

export default function PublicRoute({ children }) {
  const token = getAuthToken();

  return token ? <Navigate to="/dashboard" replace /> : children;
}
