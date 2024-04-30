import { LiaFacebook } from "react-icons/lia";
import { IoLogoWhatsapp } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-col gap-y-16 px-48 bg-xlightergray py-16">
      <div className="flex justify-between items-start">
        <button>
          <img src="src/assets/logo.png" alt="logo" className="h-7" />
        </button>
        <div className="flex flex-col gap-y-4 items-start">
          <button className="text-[20px] font-light text-xdark">About</button>
          <button className="text-[20px] font-light text-xdark">Gallery</button>
          <button className="text-[20px] font-light text-xdark">Contact</button>
        </div>
        <div className="text-[20px] font-light text-xdark">
          Find us: House 34, Road 4, Block J,<br/> Banasree, Dhaka, Bangladesh
        </div>
        <div className="flex flex-col gap-y-4 items-start">
          <button className="text-[20px] font-light text-xdark">
            Call us: +8801701665394
          </button>
          <button className="text-[20px] font-light text-xdark">
            Email us: snapgenixbd@gmail.com
          </button>
        </div>
      </div>
      <div>
        <hr className="h-1 bg-xdark" />
      </div>
      <div className="flex flex-col gap-y-6 items-center">
        <div className="flex items-center gap-x-6">
          <button>
            <LiaFacebook className="text-[50px] text-xdark" />
          </button>
          <button>
            <IoLogoWhatsapp className="text-[42px] text-xdark" />
          </button>
          <button>
            <AiOutlineYoutube className="text-[52px] text-xdark" />
          </button>
        </div>
        <div className="text-[16px] font-light text-xdark">
          Copyright © 2024 SnapGenix Agency. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
