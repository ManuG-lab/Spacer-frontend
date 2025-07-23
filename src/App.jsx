
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Spaces from "./pages/Spaces";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from './pages/About'
import Footer from './components/Footer';
import MySpaces from './owner/MySpaces';
import CreateSpace from './owner/CreateSpace';
import EditSpace from './owner/EditSpace';
import OwnerBookings from "./owner/OwnerBookings";


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
        <Route path="/owner/spaces" element={<MySpaces />} />
        <Route path="/owner/add-space" element={<CreateSpace />} />
        <Route path="/owner/spaces/:id/edit" element={<EditSpace />} />
        <Route path="/owner/bookings" element={<OwnerBookings />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </>

  );
}

export default App;
