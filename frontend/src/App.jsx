import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import api from "./api";
import { toast } from "react-toastify";
import Sidebar from "./Components/Sidebar";
import ManagePhotos from "./pages/ManagePhotos";
import ManageClients from "./pages/ManageClients";
import Clients from "./pages/Clients";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import ManageBookings from "./pages/ManageBookings";

const App = () => {
  useEffect(() => {
    const getProfile = () => {
      api
        .get("/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProfile();
  }, []);
  return (
    <div className="App font-body" id="outer-container">
      <div id="page-wrap">
        <BrowserRouter>
          <Sidebar id="sidebar" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/photos" element={<ManagePhotos />} />
            <Route path="/admin/clients" element={<ManageClients />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
