import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, allowedRoles, redirectTo = "/login" }) => {
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      userRole = payload.role; // "client", "owner", or "admin"
    } catch (err) {
      console.error("Invalid token");
    }
  }

  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // redirect unauthorized users to home
  }

  return <Component />;
};

export default ProtectedRoute;
