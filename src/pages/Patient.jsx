import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  cancelAppointment,
  doctorAppointment,
  doctorDataAPI,
  getUserData,
  showAppointmentsPatient,
  updateuserprofile,
} from "../service/allAPI";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import dashboardlogo from "../assets/Patientdashboardimage.png";
import profileicon from "../assets/profileicon.svg";
import editprof from "../assets/edit.svg";
import Header from "../components/Header";
import newappointment from "../assets/NewAppointment.svg";
import toast from "react-hot-toast";
import  { useRef } from "react";
import emailjs from "@emailjs/browser";

const Patient = () => {
  const [userData, setUserData] = useState([]);
  const [loguser, setLoguser] = useState(null);
  const [show, setShow] = useState(false);
  const [editdata, setEditdata] = useState({
    username: "",
    email: "",
    phonenumber: "",
  });
  const [doctorData, setdoctorData] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [selectedDoctorID, setSelectedDoctorID] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState(null);
  const [selectedDoctorUserName, setSelectedDoctorUserName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSpecialty, setSelectedSpeciality] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleEditClose = () => setEdit(false);
  const handleEditShow = () => {
    setEdit(true);
    setEditdata({
      username: loguser.username || " ",
      email: loguser.email || " ",
      phonenumber: loguser.phonenumber || "",
    });
  };

  useEffect(() => {
    userDataResponse();
    handleShowAppointments();
  }, []);

  useEffect(() => {
    if (userData.length) {
      loggedinUser();
    }
  }, [userData]);

  const handleEditsave = async () => {
    try {
      toast.success("Profile edits saved successfully");
      await updateuserprofile(patientLocalStorageID, editdata);
      setEdit(false);
      userDataResponse();
    } catch (err) {
      toast.error(err);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getdoctorsData();
    setShow(true);
  };

  const userDataResponse = async () => {
    try {
      let apiResponse = await getUserData();
      setUserData(apiResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedinUser = () => {
    let localUser = JSON.parse(localStorage.getItem("user"));
    let data = userData.find((user) => user.id === localUser.id);
    setLoguser(data);
  };

  const getdoctorsData = async () => {
    try {
      let doctorResponse = await doctorDataAPI();
      setdoctorData(doctorResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedDoctorObj = doctorData.find(
    (doctor) => doctor.name === selectedDoctorName
  );

  const patientLocalStorageID = JSON.parse(localStorage.getItem("user")).id;
  const patientLocalStorageName = JSON.parse(
    localStorage.getItem("user")
  ).username;

  const form = useRef();
  const handleSave = async (e) => {
    if (selectedDoctorName && selectedDate && selectedTime) {
      toast.success("Appointment Booked Successfully");

      const appointment = {
        patientID: patientLocalStorageID,
        patientName: patientLocalStorageName,
        doctorID: selectedDoctorID,
        doctorname: selectedDoctorName,
        doctorusername: selectedDoctorUserName,
        doctorSpecialty: selectedSpecialty,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        status: null,
      };

      await doctorAppointment(appointment);
      e.preventDefault();

      emailjs
        .sendForm("service_vlhbsvh", "template_nr9spha", form.current, {
          publicKey: "YOUR_PUBLIC_KEY",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      handleClose(false);
      setSelectedDoctorName(null);
      setSelectedDoctorID(null);
      setSelectedDate(null);
      setSelectedTime(null);
      handleShowAppointments();
    } else {
      toast.error("Please select all details to book appointment");
    }
  };

  const selectDoctorChange = (val) => {
    let doctorNameID = JSON.parse(val.target.value);
    setSelectedDoctorName(doctorNameID.name);
    setSelectedDoctorUserName(doctorNameID.username);
    setSelectedDoctorID(doctorNameID.id);
    setSelectedSpeciality(doctorNameID.specialty);
  };

  const handleShowAppointments = async () => {
    let appointmentResponse = await showAppointmentsPatient();
    setAppointment(appointmentResponse.data);
  };

  const handleCancel = async (id) => {
    toast.success("Appointment Cancelled Successfully");
    await cancelAppointment(id);
    handleShowAppointments();
  };

  return (
    <>
      <Header />

      <div
        className="container-fluid py-3"
        style={{ backgroundColor: "#F5e0ff", minHeight: "100vh" }}
      >
        <div className="row gy-3">
          {/* Dashboard Banner */}
          <div className="col-12 col-md-6">
            <div
              className="text-center position-relative"
              style={{ height: "200px" }}
            >
              <img
                className="rounded w-100 h-100"
                style={{ objectFit: "cover" }}
                src={dashboardlogo}
                alt=""
              />
              <div
                className="position-absolute top-0 start-0 p-3 text-white"
                style={{ width: "100%" }}
              >
                <h1 className="text-start fs-2 fw-bold">
                  Hi {patientLocalStorageName}
                </h1>
                <p className="text-start fw-bold" style={{ fontSize: "14px" }}>
                  Your health is our priority, Compassionate care, advanced
                  treatment, and a journey to recovery—together.
                </p>
                <button
                  className="btn d-flex align-items-center gap-2 fw-semibold"
                  style={{ backgroundColor: "white", color: "#9153b0" }}
                  onClick={handleShow}
                >
                  <img src={newappointment} alt="" /> New Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="col-12 col-md-6">
            <div
              className="bg-light p-3 position-relative"
              style={{ borderRadius: "20px", height: "200px" }}
            >
              <div className="d-flex justify-content-start align-items-center">
                <h6 className="fw-bold">Personal Details</h6>
                <button
                  className="btn border-0 bg-none pt-0"
                  onClick={handleEditShow}
                >
                  <img
                    style={{ width: "13px", paddingBottom: "6px" }}
                    src={editprof}
                    alt=""
                  />
                </button>
              </div>

              <div className="d-flex align-items-center">
                <div style={{ position: "absolute", left: "-3%", top: "26%" }}>
                  <img
                    src={profileicon}
                    alt=""
                    style={{ width: "120px" }}
                  />
                </div>

                <div
                  className="d-flex flex-column gap-3 mt-2"
                  style={{ marginLeft: "20%" }}
                >
                  <div className="d-flex flex-wrap gap-3">
                    {loguser && (
                      <>
                        <div>
                          <h1
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              color: "#9e5ebd",
                            }}
                          >
                            Name <br />
                            <span style={{ fontSize: "1rem", color: "black" }}>
                              {loguser.username}
                            </span>
                          </h1>
                        </div>
                        <div>
                          <h1
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              color: "#9e5ebd",
                            }}
                          >
                            Email <br />
                            <span style={{ fontSize: "1rem", color: "black" }}>
                              {loguser.email}
                            </span>
                          </h1>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="d-flex flex-wrap gap-3">
                    {loguser && (
                      <>
                        <div>
                          <h1
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              color: "#9e5ebd",
                            }}
                          >
                            Phone Number <br />
                            <span style={{ fontSize: "1rem", color: "black" }}>
                              {loguser.phonenumber}
                            </span>
                          </h1>
                        </div>
                        <div>
                          <h1
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              color: "#9e5ebd",
                            }}
                          >
                            Last Visit <br />
                            <span style={{ fontSize: "1rem", color: "black" }}>
                              10/01/2025
                            </span>
                          </h1>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="row mt-3">
          <div className="col-12">
            <div
              className="p-3 rounded"
              style={{ backgroundColor: "white", width: "100%" }}
            >
              <h6 style={{ textDecoration: "underline" }}>
                Upcoming Appointments
              </h6>

              <div
                className="p-3"
                style={{ border: "1px solid #c18cdb", borderRadius: "10px" }}
              >
                <Table hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#9153b0", color: "white" }}>
                        Sl no
                      </th>
                      <th style={{ backgroundColor: "#9153b0", color: "white" }}>
                        Appointment Date
                      </th>
                      <th style={{ backgroundColor: "#9153b0", color: "white" }}>
                        Doctor Name
                      </th>
                      <th style={{ backgroundColor: "#9153b0", color: "white" }}>
                        Department
                      </th>
                      <th style={{ backgroundColor: "#9153b0", color: "white" }}>
                        Appointment Time
                      </th>
                      <th style={{ backgroundColor: "#9153b0", color: "white" }}>
                        Appointment Status
                      </th>
                      <th style={{ backgroundColor: "#9153b0", color: "white" }}>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointment
                      .filter(
                        (patient) => patient.patientID == patientLocalStorageID
                      )
                      .map((obj, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{obj.appointmentDate}</td>
                          <td>{obj.doctorname}</td>
                          <td>{obj.doctorSpecialty}</td>
                          <td>{obj.appointmentTime}</td>
                          <td>
                            {obj.status == null ? (
                              <span
                                style={{
                                  color: "#d14d06",
                                  fontWeight: "800",
                                }}
                              >
                                Pending
                              </span>
                            ) : obj.status == "Accepted" ? (
                              <span
                                style={{ color: "green", fontWeight: "800" }}
                              >
                                Accepted
                              </span>
                            ) : (
                              <span
                                style={{ color: "red", fontWeight: "800" }}
                              >
                                Rejected
                              </span>
                            )}
                          </td>
                          <td>
                            {obj.status === null ? (
                              <button
                                className="btn btn-outline-danger"
                                style={{
                                  borderRadius: "20px",
                                  fontSize: "10px",
                                  fontWeight: "800",
                                }}
                                onClick={() => handleCancel(obj.id)}
                              >
                                Delete
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        {/* New Appointment Modal */}
        <Modal show={show} onHide={handleClose} centered size="md">
          <Modal.Header closeButton>
            <Modal.Title>New Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column gap-4">
            <select
              style={{
                border: "none",
                borderBottom: "1px solid",
                outline: "none",
              }}
              onChange={(e) => selectDoctorChange(e)}
            >
              <option value="">Select Doctor</option>
              {doctorData.map((obj, index) => (
                <option key={index} value={JSON.stringify(obj)}>
                  {obj.name}-{obj.specialty}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                border: "none",
                borderBottom: "1px solid",
                outline: "none",
              }}
            >
              <option value="">Select Date</option>
              {selectedDoctorObj?.availableSlots?.map((slot, index) => (
                <option key={index} value={slot.date}>
                  {slot.date}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{
                border: "none",
                borderBottom: "1px solid",
                outline: "none",
              }}
            >
              <option value="">Select Time</option>
              {selectedDoctorObj?.availableSlots?.map((slot, index) => (
                <option key={index} value={slot.time}>
                  {slot.time}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              style={{
                backgroundColor: "#9973AC",
                outline: "none",
                border: "none",
              }}
              onClick={(e) => handleSave(e)}
            >
              Book Appointment
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Profile Modal */}
        <Modal show={edit} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column gap-3">
            <input
              type="text"
              value={editdata.username}
              style={{
                border: "none",
                borderBottom: "1px solid",
                outline: "none",
              }}
              onChange={(e) =>
                setEditdata({ ...editdata, username: e.target.value })
              }
            />
            <input
              type="email"
              value={editdata.email}
              style={{
                border: "none",
                borderBottom: "1px solid",
                outline: "none",
              }}
              onChange={(e) =>
                setEditdata({ ...editdata, email: e.target.value })
              }
            />
            <input
              type="text"
              value={editdata.phonenumber}
              style={{
                border: "none",
                borderBottom: "1px solid",
                outline: "none",
              }}
              onChange={(e) =>
                setEditdata({ ...editdata, phonenumber: e.target.value })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
            <Button
              style={{
                backgroundColor: "#9973AC",
                outline: "none",
                border: "none",
              }}
              onClick={handleEditsave}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Patient;