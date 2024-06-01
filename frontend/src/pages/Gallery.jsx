import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import api from "../api";
import Footer from "../Components/Footer";
import Masonry from "react-masonry-css";
import "../index.css";
import { Select } from "antd";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("");

  const categories = [
    { label: "All", value: "" },
    { label: "Food", value: "food" },
    { label: "Product", value: "product" },
    { label: "Wedding", value: "wedding" },
    { label: "Lifestyle", value: "lifestyle" },
    { label: "Ambience", value: "ambience" },
    { label: "Corporate Headshot", value: "corporate" },
  ];

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2,
  };

  const getCategories = () => {
    api
      .get("/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPhotos(res.data[category]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    if (category === "") getPhotos();
    else getCategories();
  }, [category]);

  return (
    <div className="min-h-screen">
      <Navbar active="photos" />
      <div>
        <div className="w-full flex justify-end my-2 items-center gap-x-2 px-2 md:px-32">
          <h1 className="text-lg text-xgray font-light">View:</h1>
          <Select
            defaultValue={{ value: "", label: "All" }}
            size="large"
            style={{ width: 200 }}
            placeholder="Select a category"
            options={categories.map((category) => ({
              label: category.label,
              value: category.value,
            }))}
            onChange={setCategory}
          />
        </div>
        <div className="mx-2 overflow-auto">
          {photos?.length > 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.photo}
                  alt={photo.title}
                  className="w-full object-cover"
                />
              ))}
            </Masonry>
          ) : (
            <div className="flex flex-col items-center my-5 w-full justify-center">
              <img src="no_image.png" alt="No photos found" className="w-72" />
              <h1 className="text-center text-2xl mt-5 text-dark">
                Photos Coming Soon...!
              </h1>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
