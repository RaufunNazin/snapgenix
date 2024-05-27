import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Navbar = ({ active }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getProfile = () => {
    api
      .get("/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, []);
  return (
    <div className="flex justify-between items-center px-2 lg:px-32 py-3 lg:py-5">
      <button onClick={() => navigate("/")}>
        <img src="/logo.png" alt="logo" className="h-5 lg:h-7" />
      </button>
      <div className="hidden md:grid grid-cols-3 gap-x-10">
        <button
          onClick={() => navigate("/gallery")}
          className={`uppercase ${
            active === "gallery" ? "text-xblue" : "text-xdark"
          } font-light hover:text-xblue transition-all duration-150`}
        >
          gallery
        </button>
        <button
          onClick={() => navigate("/clients")}
          className={`uppercase ${
            active === "clients" ? "text-xblue" : "text-xdark"
          } font-light hover:text-xblue transition-all duration-150`}
        >
          clients
        </button>
        {localStorage.getItem("token") ? (
          <button
            onClick={() => navigate("/profile")}
            className={`uppercase ${
              active === "profile" ? "text-xblue" : "text-xdark"
            } font-light hover:text-xblue transition-all duration-150`}
          >
            profile
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className={`uppercase ${
              active === "contact" ? "text-xblue" : "text-xdark"
            } font-light hover:text-xblue transition-all duration-150`}
          >
            login
          </button>
        )}
      </div>
      <div className="flex gap-x-2">
        {user?.role === 1 && (
          <button
            onClick={() => navigate("/admin/photos")}
            className="hidden lg:block uppercase text-white border border-xblue px-6 py-2 hover:bg-sky-500 bg-xblue hover:text-white transition-all duration-200"
          >
            Admin Panel
          </button>
        )}
        <button
          onClick={() => navigate("/booking")}
          className="hidden lg:block uppercase text-xblue border border-xblue px-6 py-2 hover:bg-xblue hover:text-white transition-all duration-200"
        >
          Request a Shoot
        </button>
      </div>
    </div>
  );
};

export default Navbar;
