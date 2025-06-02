import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import ScrollToTop from "/src/functions/scrollToTop.jsx";
import "./index.scss";
import JoinQueue from "/src/pages/JoinQueue";
import WaitingList from "/src/pages/WaitingList";
import AdminDashboard from "/src/pages/AdminDashboard";
import AdminLogin from "./pages/adminLogin/AdminLogin";

export default function App() {
  return (
    // <ThemeProvider>
    <HashRouter>
      {/* Function to Scroll To Top of Page for React-Router when changing pages */}
      <ScrollToTop />

      <Routes>
        {/* Home Route */}
        <Route index element={<JoinQueue />} />

        {/* About Route */}
        <Route path="/waiting-list" element={<WaitingList />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
    // </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
