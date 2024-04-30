import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadPhoto = async () => {
    try {
      if (!file) return;
      console.log(file);
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("title", "photo");
      formData.append("description", "pizza");
      formData.append("category", "food");

      const response = await axios.post(
        "http://localhost:8000/photos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxNzUwNzYwMzU3fQ.Z3EYWARiWOhrZ8c6pC-Mr51Z3QhczaP55gQZHBVYcgM",
          },
        }
      );

      if (response.status === 201) {
        alert("File uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
