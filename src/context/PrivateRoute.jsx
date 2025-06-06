import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./PrivateRoute.scss";
// Import a loading spinner (using a simple div or a spinner component)
const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />; // Show spinner while loading
  return user ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
