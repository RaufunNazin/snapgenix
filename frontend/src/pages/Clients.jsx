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
      <div className="flex flex-wrap justify-center">
        {clients.map((client) => (
          <div
            key={client.id}
            className="m-5 p-5 bg-white shadow-md rounded-md"
          >
            <img
              src={client.photo}
              alt={client.name}
              className="w-40 h-40 object-contain"
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Clients;
