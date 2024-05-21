import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
dayjs.extend(customParseFormat);
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const { state } = useLocation();
  const today = dayjs().format("YYYY-MM-DD");
  const dateFormat = "YYYY-MM-DD";
  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [type, setType] = useState("photo");
  const [description, setDescription] = useState("");
  const types = [
    {
      label: "Photography",
      value: "photo",
    },
    {
      label: "Videography",
      value: "video",
    },
    {
      label: "Digital Marketing",
      value: "marketing",
    },
  ];
  const submitBooking = () => {
    if (!name || !date || !type) {
      toast.error("Please fill all fields");
      return;
    }
    api
      .post(
        "/bookings",
        {
          user_id: JSON.parse(localStorage.getItem("user")).id,
          name: name,
          date: date,
          service_type: type,
          description: description,
          status: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Booking request submitted successfully");
          setDate(today);
          setType("photo");
          setDescription("");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        <div className="mx-2 lg:mx-32 mt-2 lg:mt-16">
          <div className="text-xl lg:text-2xl text-xdark font-light">
            Request a booking
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            <div>
              <div className="text-sm text-xgray">Business Name</div>
              <input
                type="text"
                value={name}
                className="p-[3px] px-2 border rounded-md w-full outline-none focus:border-xblue transition-all duration-300"
                placeholder="Enter Your Business Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="text-sm text-xgray">Select a Date</div>
              <DatePicker
                placeholder="Select a Date"
                className="w-full"
                value={dayjs(date, dateFormat)}
                minDate={dayjs(today, dateFormat)}
                onChange={(date) => setDate(date.format(dateFormat))}
              />
            </div>
            <div className="w-full">
              <div className="text-sm text-xgray">Select Service Type</div>
              <Select
                className="w-full"
                defaultValue={state ? state : "photo"}
                // value={type}
                placeholder="Select Type"
                options={types}
                onChange={(value) => setType(value)}
              />
            </div>
            <div className="lg:col-span-3">
              <div className="text-sm text-xgray">Additional Information</div>
              <textarea
                className="p-2 border rounded-md w-full outline-none focus:border-xblue transition-all duration-300"
                placeholder="Anything you'd like to add?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={submitBooking}
              className="bg-xblue text-white px-5 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
