import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router";
import ScrollToTop from "/src/functions/scrollToTop.jsx";
import "./index.scss";
import JoinQueue from "/src/pages/JoinQueue";
import WaitingList from "/src/pages/WaitingList";
import AdminDashboard from "/src/pages/AdminDashboard";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import AuthProvider from "./context/AuthContext"; // Import AuthProvider
import PrivateRoute from "./context/PrivateRoute"; // Import PrivateRoute
import Navbar from "./components/navbar/Navbar";
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <Navbar />

        <Routes>
          {/* Public Routes (No AuthProvider) */}
          <Route index element={<JoinQueue />} />
          <Route path="/waiting-list" element={<WaitingList />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Wrap Only Protected Routes in AuthProvider */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
