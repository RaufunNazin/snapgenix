import React, { useEffect, useRef, useState } from "react";
import SidePanel from "../Components/SidePanel";
import { Select, Table } from "antd";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const upload = () => {
    if (!title || !category || !file) {
      toast.error("Please fill all fields");
      return;
    }
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("title", title);
    formData.append("description", description ? description : "Description");
    formData.append("category", category);
    api
      .post("/photos", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Photo uploaded successfully");
          getPhotos();
        }
        setTitle("");
        setDescription("");
        setCategory("");
        setFile(null);
        fileInputRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };
  const categories = [
    "food",
    "product",
    "wedding",
    "lifestyle",
    "ambience",
    "corporate",
  ];
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
        toast.error(err.response.data?.detail || err.message);
      });
  };
  const deletePhoto = (id) => {
    api

      .delete(`/photos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Photo deleted successfully");
          getPhotos();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="flex flex-1">
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
      <SidePanel />
      <div className="flex flex-col flex-1">
        <div className="w-full p-10">
          <div className="text-2xl">Upload Photos</div>
          <div className="mt-5 grid grid-cols-3 gap-5">
            <input
              type="text"
              value={title}
              className="p-2 border rounded-md"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              size="large"
              value={category}
              placeholder="Select Category"
              options={categories.map((category) => ({
                label: category,
                value: category,
              }))}
              onChange={(value) => setCategory(value)}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png"
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
            <textarea
              type="text"
              value={description}
              className="p-2 border rounded-md col-span-3"
              placeholder="Description (optional)"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={upload}
              className="mt-5 bg-xblue text-white py-3 px-6 rounded-md hover:bg-sky-500 transition-all duration-200"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="w-full p-10">
          <div className="text-2xl">All Photos</div>
          <div className="mt-5">
            <Table
              dataSource={photos}
              rowKey="id"
              style={{ overflowX: "auto" }}
              pagination={{
                defaultPageSize: 20,
                showSizeChanger: true,
                pageSizeOptions: ["20", "50", "100"],
              }}
              columns={[
                {
                  title: "Photo",
                  dataIndex: "photo",
                  render: (photo) => {
                    return <img src={photo} alt="photo" className="h-20" />;
                  },
                },
                {
                  title: "Title",
                  dataIndex: "title",
                },
                {
                  title: "Category",
                  dataIndex: "category",
                },
                {
                  title: "Description",
                  dataIndex: "description",
                },
                {
                  title: "Actions",
                  render: (actions, record) => {
                    return (
                      <div className="flex gap-x-5">
                        {/* <button className="text-blue-500">Edit</button> */}
                        <button
                          onClick={() => deletePhoto(record.id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePhotos;
