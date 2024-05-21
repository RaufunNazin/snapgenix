import React, { useEffect, useRef, useState } from "react";
import SidePanel from "../Components/SidePanel";
import { Select, Table } from "antd";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const getBookings = () => {
    api
      .get("/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };
  const approveBooking = (id) => {
    api
      .get(`/bookings/approve/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Booking approved successfully");
          getBookings();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };
  const rejectBooking = (id) => {
    api
      .get(`/bookings/reject/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Booking rejected successfully");
          getBookings();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };
  const deleteBooking = (id) => {
    api
      .delete(`/bookings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Booking deleted successfully");
          getBookings();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      });
  };
  useEffect(() => {
    getBookings();
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
      <div className="w-full p-2 lg:p-10">
        <div className="text-2xl">All Bookings</div>
        <div className="mt-5 w-72 lg:w-full">
          <Table
            dataSource={bookings}
            style={{ overflowX: "auto" }}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ["20", "50", "100"],
            }}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                key: "id",
              },
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Service Type",
                dataIndex: "service_type",
                key: "service_type",
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
              },
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status) => {
                  return (
                    <div
                      className={`${
                        status === 0 ? "bg-xyellow" : "bg-green-600"
                      } w-fit rounded-md px-3 py-1 text-white`}
                    >
                      {status === 0 ? "Pending" : "Approved"}
                    </div>
                  );
                },
              },
              {
                title: "Actions",
                dataIndex: "status",
                key: "status",
                render: (status, record) => {
                  return (
                    <div className="flex gap-x-5">
                      {status === 0 ? (
                        <button
                          onClick={() => approveBooking(record.id)}
                          className="text-green-500"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => rejectBooking(record.id)}
                          className="text-red-500"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => deleteBooking(record.id)}
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
  );
};

export default ManageBookings;
