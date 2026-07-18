import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function VendorRoute() {
  const { isAuthenticated, currentUser, loading } = useSelector((s) => s.auth);
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (currentUser.role !== "vendor") return <Navigate to="/" replace />;
  return <Outlet />;
}

export default VendorRoute;
