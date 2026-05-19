import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  // CHECK TOKEN

  const token =
    localStorage.getItem("adminToken");

  // NOT LOGGED IN

  if (!token) {

    return <Navigate to="/admin-login" />;

  }

  // ALLOW ACCESS

  return children;

};

export default AdminRoute;