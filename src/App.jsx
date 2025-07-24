import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Spaces from "./pages/Spaces";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Pay from "./pages/Pay";

import MySpaces from "./owner/MySpaces";
import CreateSpace from "./owner/CreateSpace";
import EditSpace from "./owner/EditSpace";
import OwnerBookings from "./owner/OwnerBookings";
import Payments from "./owner/Payments";

// ✅ Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import ManageSpaces from "./admin/ManageSpaces";
import ManageBookings from "./admin/ManageBookings";

function App() {
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      userRole = payload.role; // "client" or "owner"
    } catch (err) {
      console.error("Invalid token");
    }
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* Client Routes */}
        <Route path="/bookings" element={token ? <Bookings /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/pay/:bookingId" element={token ? <Pay /> : <Navigate to="/login" />} />

        {/* Owner Routes */}
        <Route
          path="/owner/spaces"
          element={userRole === "owner" ? <MySpaces /> : <Navigate to="/" />}
        />
        <Route
          path="/owner/add-space"
          element={userRole === "owner" ? <CreateSpace /> : <Navigate to="/" />}
        />
        <Route
          path="/owner/spaces/:id/edit"
          element={userRole === "owner" ? <EditSpace /> : <Navigate to="/" />}
        />
        <Route
          path="/owner/bookings"
          element={userRole === "owner" ? <OwnerBookings /> : <Navigate to="/" />}
        />
        <Route
          path="/owner/payments"
          element={userRole === "owner" ? <Payments /> : <Navigate to="/" />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={userRole === "owner" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/spaces"
          element={userRole === "owner" ? <ManageSpaces /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/bookings"
          element={userRole === "owner" ? <ManageBookings /> : <Navigate to="/" />}
        />

        {/* Catch All - 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
