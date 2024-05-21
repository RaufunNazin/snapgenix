import React, { useEffect, useRef, useState } from "react";
import SidePanel from "../Components/SidePanel";
import { Select, Table } from "antd";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const upload = () => {
    if (!name || !file) {
      toast.error("Please fill all fields");
      return;
    }
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", name);
    api
      .post("/clients", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Logo uploaded successfully");
          getClients();
        }
        setName("");
        setFile(null);
        fileInputRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };

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
        toast.error(err.response.data?.detail || err.message);
      });
  };

  const deleteClient = (id) => {
    api
      .delete(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Client logo deleted successfully");
          getClients();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };

  useEffect(() => {
    getClients();
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
          <div className="text-2xl">Upload Client Logos</div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <input
              type="text"
              value={name}
              className="p-2 border rounded-md"
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
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
          <div className="text-2xl">All Client Logos</div>
          <div className="mt-5">
            <Table
              dataSource={clients}
              rowKey="id"
              style={{ overflowX: "auto" }}
              pagination={{
                defaultPageSize: 20,
                showSizeChanger: true,
                pageSizeOptions: ["20", "50", "100"],
              }}
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Logo",
                  dataIndex: "photo",
                  key: "photo",
                  render: (photo, record) => (
                    <img src={photo} alt={record.name} className="h-20" />
                  ),
                },
                {
                  title: "Action",
                  key: "action",
                  render: (action, record) => (
                    <button
                      onClick={() => deleteClient(record.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClients;
