import { useNavigate } from "react-router-dom";

const Navbar = ({active}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-2 lg:px-32 py-3 lg:py-5">
      <button onClick={() => navigate("/")}>
        <img src="src/assets/logo.png" alt="logo" className="h-5 lg:h-7" />
      </button>
      <div className="hidden lg:grid grid-cols-3 gap-x-10">
        <button
          onClick={() => navigate("/")}
          className={`uppercase ${active === "gallery" ? "text-xblue" : "text-xdark"} font-light hover:text-xblue transition-all duration-150`}
        >
          gallery
        </button>
        <button
          onClick={() => navigate("/")}
          className={`uppercase ${active === "clients" ? "text-xblue" : "text-xdark"} font-light hover:text-xblue transition-all duration-150`}
        >
          clients
        </button>
        <button
          onClick={() => navigate("/")}
          className={`uppercase ${active === "contact" ? "text-xblue" : "text-xdark"} font-light hover:text-xblue transition-all duration-150`}
        >
          contact
        </button>
      </div>
      <button className="hidden lg:block uppercase text-xblue border border-xblue px-6 py-2 hover:bg-xblue hover:text-white transition-all duration-200">
        Request a Shoot
      </button>
    </div>
  );
};

export default Navbar;