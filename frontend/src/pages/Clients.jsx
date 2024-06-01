import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import api from "../api";
import Footer from "../Components/Footer";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const getClients = () => {
    api
      .get("/clients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getClients();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar active="clients" />
      <div className="flex flex-wrap justify-center mx-2 lg:mx-32 my-5 ">
        {clients.map((client) => (
          <div
            key={client.id}
            className="m-1 lg:m-3 p-1 lg:p-3"
          >
            <img
              src={client.photo}
              alt={client.name}
              className="w-40 h-40 object-contain grayscale"
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Clients;
