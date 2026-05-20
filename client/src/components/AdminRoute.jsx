import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const adminToken =
    localStorage.getItem("adminToken");

  // ONLY ADMIN CAN ACCESS

  if (!adminToken) {

    return (
      <Navigate to="/admin-login" />
    );

  }

  return children;

};

export default AdminRoute;