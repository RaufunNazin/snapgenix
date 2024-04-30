import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-2 lg:px-32 py-5">
      <button onClick={() => navigate("/")}>
        <img src="src/assets/logo.png" alt="logo" className="h-7" />
      </button>
      <div className="grid grid-cols-3 gap-x-10">
        <button
          onClick={() => navigate("/")}
          className="uppercase text-xdark font-light"
        >
          about
        </button>
        <button
          onClick={() => navigate("/")}
          className="uppercase text-xdark font-light"
        >
          gallery
        </button>
        <button
          onClick={() => navigate("/")}
          className="uppercase text-xdark font-light"
        >
          contact
        </button>
      </div>
      <button className="uppercase text-xblue border border-xblue px-6 py-2 hover:bg-xblue hover:text-white transition-all duration-200">
        Request a Shoot
      </button>
    </div>
  );
};

export default Navbar;
