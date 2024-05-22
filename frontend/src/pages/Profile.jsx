import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const navigate = useNavigate();
  const getProfile = () => {
    api
      .get("/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBookings = () => {
    api
      .get(`/bookings/${JSON.parse(localStorage.getItem("user"))?.id}`, {
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
  const cancelBooking = () => {
    if (!bookingId) {
      toast.error("Invalid booking id");
      return;
    }
    api
      .delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Booking cancelled successfully");
          getBookings();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data?.detail || err.message);
      })
      .finally(() => {
        setDeleteModal(false);
      });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: "logout" });
  };
  useEffect(() => {
    getProfile();
    getBookings();
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Navbar active="profile" />
        <div className="mx-2 lg:mx-32 my-2 lg:my-16">
          <div className="bg-sky-50 p-5 my-5">
            <div className="text-sm text-xdark font-light uppercase mb-5">
              User Profile
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="flex flex-col lg:items-center">
                <div className="text-sm font-bold">Username</div>
                <div>{user.username}</div>
              </div>
              <div className="flex flex-col lg:items-center">
                <div className="text-sm font-bold">Email</div>
                <div>{user.email}</div>
              </div>
              <div className="lg:flex hidden justify-center col-span-2 lg:col-auto">
                <button
                  onClick={logout}
                  className="w-fit px-5 border border-xred text-xred hover:bg-xred hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          {bookings.length !== 0 && (
            <div>
              <div className="text-xlightgray">My Bookings</div>
              <div>
                <Table
                  dataSource={bookings}
                  rowKey="id"
                  style={{ overflowX: "auto" }}
                  pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                  }}
                  columns={[
                    {
                      title: "Business Name",
                      dataIndex: "name",
                    },
                    {
                      title: "Date",
                      dataIndex: "date",
                    },
                    {
                      title: "Service Type",
                      dataIndex: "service_type",
                      render: (service_type) => {
                        return (
                          <div>
                            {service_type === "photo"
                              ? "Photography"
                              : service_type === "video"
                              ? "Videography"
                              : "Digital Marketing"}
                          </div>
                        );
                      },
                    },
                    {
                      title: "Description",
                      dataIndex: "description",
                    },
                    {
                      title: "Status",
                      dataIndex: "status",
                      render: (status) => (
                        <div
                          className={`${
                            status === 0 ? "bg-xyellow" : "bg-green-600"
                          } w-fit rounded-md px-3 py-1 text-white`}
                        >
                          {status === 0 ? "Pending" : "Approved"}
                        </div>
                      ),
                    },
                    {
                      title: "Action",
                      dataIndex: "status",
                      render: (status, record) => {
                        return (
                          <div>
                            {status === 0 && (
                              <button
                                onClick={() => {
                                  setDeleteModal(true);
                                  setBookingId(record.id);
                                }}
                                className="bg-red-600 text-white px-3 py-1 rounded-md"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        );
                      },
                    },
                  ]}
                />
              </div>
            </div>
          )}

          <Modal
            title="Cancel Booking"
            open={deleteModal}
            onOk={cancelBooking}
            okText="Confirm"
            onCancel={() => setDeleteModal(false)}
            centered
          >
            <div className="mx-2 my-4">
              Are you sure you want to cancel this booking?
            </div>
          </Modal>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
