import { LiaFacebook } from "react-icons/lia";
import { IoLogoWhatsapp } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const copy = (text) => {
    try {
      toast.success("Copied to clipboard");
      navigator.clipboard.writeText(text);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable={true}
        pauseOnHover={false}
        theme="colored"
      />
      <div className="flex flex-col gap-y-8 lg:gap-y-16 px-2 lg:px-48 bg-xlightergray py-8 lg:py-16">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <button onClick={() => navigate("/")}>
            <img src="src/assets/logo.png" alt="logo" className="h-4 lg:h-7" />
          </button>
          <div className="flex lg:flex-col gap-4 items-start">
            <button
              onClick={() => navigate("/gallery")}
              className="text-[12px] lg:text-[20px] font-light text-xdark hover:text-xblue transition-all duration-150"
            >
              Gallery
            </button>
            <button
              onClick={() => navigate("/clients")}
              className="text-[12px] lg:text-[20px] font-light text-xdark hover:text-xblue transition-all duration-150"
            >
              Clients
            </button>
            {localStorage.getItem("token") ? (
              <button
                onClick={() => navigate("/profile")}
                className="text-[12px] lg:text-[20px] font-light text-xdark hover:text-xblue transition-all duration-150"
              >
                Profile
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-[12px] lg:text-[20px] font-light text-xdark hover:text-xblue transition-all duration-150"
              >
                Login
              </button>
            )}
          </div>
          <Tooltip title="Click to view" color={"#555555"} key={"location"}>
            <a
              href="https://www.google.com/maps/search/Road+4,+Block+J,+Banasree,+Dhaka,+Bangladesh/@23.7747992,90.353354,13z/data=!3m1!4b1?entry=ttu"
              target="_blank"
              className="text-[12px] lg:text-[20px] font-light text-xdark w-full text-center lg:text-left lg:w-fit"
            >
              Find us: House 34, Road 4, Block J,
              <br className="hidden lg:block" /> Banasree, Dhaka, Bangladesh
            </a>
          </Tooltip>

          <div className="flex lg:flex-col gap-y-4 justify-between w-full lg:w-fit items-start">
            <Tooltip title="Click to copy" color={"#555555"} key={"phone"}>
              <button
                onClick={() => copy("+8801701665394")}
                className="text-[12px] lg:text-[20px] font-light text-xdark"
              >
                Call us: +8801701665394
              </button>
            </Tooltip>

            <Tooltip title="Click to copy" color={"#555555"} key={"mail"}>
              <button
                onClick={() => copy("snapgenixbd@gmail.com")}
                className="text-[12px] lg:text-[20px] font-light text-xdark"
              >
                Email us: snapgenixbd@gmail.com
              </button>
            </Tooltip>
          </div>
        </div>
        <div>
          <hr className="h-1 bg-xdark" />
        </div>
        <div className="flex flex-col gap-y-2 lg:gap-y-6 items-center">
          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <a href="https://www.facebook.com/snapgenix" target="_blank">
              <button>
                <LiaFacebook className="text-[25px] lg:text-[50px] text-xdark hover:text-xblue transition-all duration-150" />
              </button>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=%2B8801701665394"
              target="_blank"
            >
              <button>
                <IoLogoWhatsapp className="text-[21px] lg:text-[42px] text-xdark hover:text-xblue transition-all duration-150" />
              </button>
            </a>

            <a href="https://www.youtube.com/@SnapGenix" target="_blank">
              <button>
                <AiOutlineYoutube className="text-[26px] lg:text-[52px] text-xdark hover:text-xblue transition-all duration-150" />
              </button>
            </a>
          </div>
          <div className="text-[12px] lg:text-[16px] font-light text-xdark">
            Copyright © 2024 SnapGenix Agency. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
