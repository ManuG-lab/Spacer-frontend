import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'swiper/css';
import 'swiper/css/navigation';

// Pages
import Home from "./pages/Home";
import Spaces from "./pages/Spaces";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Pay from "./pages/Pay";

// Owner pages
import MySpaces from "./owner/MySpaces";
import CreateSpace from "./owner/CreateSpace";
import EditSpace from "./owner/EditSpace";
import OwnerBookings from "./owner/OwnerBookings";
import Payments from "./owner/Payments";

// Admin
import Overview from "./admin/pages/Overview";
import ManageUsers from "./admin/pages/ManageUsers";
import ManageSpaces from "./admin/pages/ManageSpaces";
import Reports from "./admin/pages/Reports";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/pay/:bookingId" element={<Pay />} />

        {/* Owner Routes */}
        <Route
          path="/owner/spaces"
          element={<MySpaces />} 
        />
        <Route
          path="/owner/add-space"
          element={<CreateSpace />} 
        />
        <Route
          path="/owner/spaces/:id/edit"
          element={<EditSpace />} 
        />
        <Route
          path="/owner/bookings"
          element={<OwnerBookings />} 
        />
        <Route
          path="/owner/payments"
          element={<Payments />} 
        />

        {/* Admin Dashboard with nested routes */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        >
          <Route element={<Overview />} />
          <Route path="users" element={<ManageUsers  />} />
          <Route path="spaces" element={<ManageSpaces />} />
          <Route path="reports" element={<Reports />} />
          <Route path="overview" element={<Overview />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
