import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { message } from "antd";

function VendorRoute() {
  const { isAuthenticated, currentUser, loading } = useSelector((s) => s.auth);
  useEffect(() => {
    if (isAuthenticated && currentUser.role !== "vendor") {
      message.warning("Only vendor user can edit products!");
    }
  }, [isAuthenticated, currentUser.role]);
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (currentUser.role !== "vendor") return <Navigate to="/" replace />;
  return <Outlet />;
}

export default VendorRoute;
