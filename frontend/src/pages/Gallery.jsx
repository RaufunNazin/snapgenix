import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import api from "../api";
import Footer from "../Components/Footer";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const getPhotos = () => {
    api
      .get("/photos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPhotos();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar active="photos" />
      <div className="flex flex-wrap justify-center">
        {photos.map((photo) => (
          <div key={photo.id} className="">
            <img src={photo.photo} alt={photo.title} className="w-40" />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
