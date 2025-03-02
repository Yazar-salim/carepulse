import  { useEffect, useState } from "react";
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
import editprofile from "../assets/edit.svg";
import Header from "../components/Header";
import newappointment from "../assets/NewAppointment.svg";
import toast from "react-hot-toast";

const Patient = () => {
  const [userData, setUserData] = useState([]);
  const [loguser, setLoguser] = useState(null);

  // console.log(userData);

  const [show, setShow] = useState(false);

  //to store edited data
  const [editdata, setEditdata] = useState({
    username: "",
    email: "",
    phonenumber: "",
  });

  // for get doctors data from Server

  const [doctorData, setdoctorData] = useState([]);

  //to store  appointment taken by patient

  const [appointment, setAppointment] = useState([]);

  //to store selected doctor name date and time
  const [selectedDoctorID, setSelectedDoctorID] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState(null);
  const [selectedDoctorUserName, setSelectedDoctorUserName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSpecialty, setSelectedSpeciality] = useState(null);

  //second modal
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

  //second modal ends

  useEffect(() => {
    userDataResponse();
    // loggedinUser();
    handleShowAppointments();
  }, []);

  useEffect(() => {
    if (userData.length) {
      loggedinUser();
    }
  }, [userData]);

  //save edited data
  const handleEditsave = async () => {
    try {
      toast.success("Profile edits saved succesfully")
      await updateuserprofile(patientLocalStorageID, editdata);
      setEdit(false);
      userDataResponse();
      // console.log(res);
    } catch (err) {
      toast.error(err)
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getdoctorsData();
    setShow(true);
    // userDataResponse()
  };

  // console.log(userData);

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
    // console.log(localUser);

    let data = userData.find((user) => user.id === localUser.id);
    // console.log(data);

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

  // console.log(doctorData);

  const selectedDoctorObj = doctorData.find(
    (doctor) => doctor.name === selectedDoctorName
  );
  // console.log(selectedDoctorObj);

  const patientLocalStorageID = JSON.parse(localStorage.getItem("user")).id;
  const patientLocalStorageName = JSON.parse(
    localStorage.getItem("user")
  ).username;
  // console.log(patientLocalStorageID);
  const handleSave = async () => {

    if(selectedDoctorName && selectedDate &&selectedTime){

      toast.success("Appointment Booked Successfully")

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
  
      // console.log(typeof(appointment.status));
  
      await doctorAppointment(appointment);
      handleClose(false);
      setSelectedDoctorName(null);
      setSelectedDoctorID(null);
      setSelectedDate(null);
      setSelectedTime(null);
      handleShowAppointments();
    }
    else{
      toast.error("please select all details to book appointment")
    }

  };

  const selectDoctorChange = (val) => {
    let doctorNameID = JSON.parse(val.target.value);
    setSelectedDoctorName(doctorNameID.name);
    setSelectedDoctorUserName(doctorNameID.username);
    setSelectedDoctorID(doctorNameID.id);
    setSelectedSpeciality(doctorNameID.specialty);
  };

  //function to show Appointments taken
  const handleShowAppointments = async () => {
    let appointmentResponse = await showAppointmentsPatient();

    // console.log(appointmentResponse.data);
    // let sortedAppointments = appointmentResponse.data.sort((a, b) => (a.appointmentDate-b.appointmentDate
    // ))

    setAppointment(appointmentResponse.data);
  };


  // delete appointment from patient side
  const handleCancel=async(id)=>{
    toast.success("Appointment Cancelled Successfully")
    await cancelAppointment(id)
    handleShowAppointments()
    
  }
  return (
    <>
      <Header />

      <div
        className="container-fluid py-3 "
        style={{ backgroundColor: "#F5e0ff", height: "100vh" }}
      >
        <div className="  mt-3   " style={{}}>
          <div className="d-flex gap-5 justify-content-center">
            <div
              className="text-center"
              style={{ position: "relative", width: "45%", height: "200px" }}
            >
              <img
                className=" rounded"
                style={{
                  backgroundColor: "9e5ebd",
                  width: "100%",
                  height: "180px",
                }}
                src={dashboardlogo}
                alt=""
              />

              <div
                style={{
                  position: "absolute",
                  top: "11%",
                  left: "5%",
                  width: "78%",
                }}
              >
                <h1 className="text-start text-white fs-2 fw-bold">
                  Hi {patientLocalStorageName}
                </h1>
                <p
                  className="text-start text-white fw-bold"
                  style={{ fontSize: "14px", width: "120%" }}
                >
                  Your health is our priority, Compassionate care, advanced
                  treatment, and a journey to recovery—together.
                </p>
                <button
                  className="btn mb-4 d-flex flex-start gap-2 align-items-center   fw-semibold"
                  style={{ backgroundColor: "white", color: "#9153b0" }}
                  onClick={handleShow}
                >
                  <img src={newappointment} alt="" /> New Appointment
                </button>
              </div>
            </div>

            <div
              className="bg-light px-3 py-3"
              style={{
                position: "relative",
                width: "45%",
                height: "180px",
                borderRadius: "20px",
              }}
            >
              <div className="d-flex justify-content-start align-items-center">
                <h6 className="fw-bold ">Personal Details</h6>
                <button
                  className="btn border-0 bg-none pt-0 "
                  onClick={handleEditShow}
                >
                  <img
                    style={{ width: "13px", paddingBottom: "6px" }}
                    src={editprofile}
                    alt=""
                  />
                </button>
              </div>

              <div>
                <div
                  className=""
                  style={{ position: "absolute", left: "-3%", top: "26%" }}
                >
                  <img
                    src={profileicon}
                    alt=""
                    // className="rounded "
                    style={{
                      width: "120px",
                    }}
                  />
                </div>

                <div
                  className="d-flex flex-column gap-3 mt-2 "
                  style={{ marginLeft: "20%" }}
                >
                  <div className="d-flex gap-5">
                    {loguser && (
                      <>
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
                        <h1
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            color: "#9e5ebd",
                            marginLeft: "15%",
                          }}
                        >
                          Email <br />
                          <span style={{ fontSize: "1rem", color: "black" }}>
                            {loguser.email}
                          </span>{" "}
                        </h1>

                        {/* <h1 style={{fontSize:"1rem",fontWeight:"700"}}> </h1> */}
                      </>
                    )}
                  </div>
                  <div className="d-flex gap-5">
                    {loguser && (
                      <>
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
                          </span>{" "}
                        </h1>

                        <h1
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            color: "#9e5ebd",
                            marginLeft: "3%",
                          }}
                        >
                          Last Visit
                          <br />
                          <span style={{ fontSize: "1rem", color: "black" }}>
                            10/01/2025{" "}
                          </span>
                        </h1>

                        {/* <h1 style={{fontSize:"1rem",fontWeight:"700"}}>Phone Number:{loguser.phonenumber} </h1> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-1">
            <div
              className=" p-3 rounded "
              style={{ width: "95%", margin: "auto", backgroundColor: "white" }}
            >
              <h6 style={{ textDecoration: "underline" }}>
                Upcoming Appointments
              </h6>

              <div
                className=" p-3"
                style={{ border: "1px solid #c18cdb ", borderRadius: "10px" }}
              >
                <Table hover size="sm" style={{ borderCollapse: "collapse" }}>
                  <thead style={{}}>
                    <tr>
                      <th
                        style={{
                          padding: "10px",
                          backgroundColor: "#9153b0",
                          color: "white",
                        }}
                      >
                        Sl no
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          backgroundColor: "#9153b0",
                          color: "white",
                          width:"20%"
                        }}
                      >
                        Appointment Date
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          backgroundColor: "#9153b0",
                          color: "white",
                        }}
                      >
                        Doctor Name
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          backgroundColor: "#9153b0",
                          color: "white",
                        }}
                      >
                        Department
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          backgroundColor: "#9153b0",
                          color: "white",
                        }}
                      >
                        Appointment Time
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          backgroundColor: "#9153b0",
                          color: "white",
                        }}
                      >
                        Appointment Status
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          backgroundColor: "#9153b0",
                          color: "white",
                        }}
                      >
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
                          <td style={{ padding: "10px" }}>{i + 1}</td>
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "center",
                              paddingRight: "9%",
                            }}
                          >
                            {obj.appointmentDate}
                          </td>
                          <td style={{ padding: "10px" }}>{obj.doctorname}</td>
                          <td style={{ padding: "10px" }}>
                            {obj.doctorSpecialty}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "center",
                              paddingRight: "9%",
                            }}
                          >
                            {obj.appointmentTime}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              textAlign: "center",
                              paddingRight: "9%",
                            }}
                          >
                            {obj.status == null ? (
                              <span
                                style={{
                                  color: "#d14d06",
                                  fontSize: "14px",
                                  fontWeight: "800",
                                }}
                              >
                                Pending
                              </span>
                            ) : obj.status == "Accepted" ? (
                              <span
                                style={{
                                  color: "green",
                                  fontSize: "14px",
                                  fontWeight: "800",
                                }}
                              >
                                Accepted
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  fontWeight: "800",
                                }}
                              >
                                Rejected
                              </span>
                            )}
                          </td>

                          <td
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              paddingRight: "9%",
                            }}
                          >
                            {obj.status===null?<button
                              style={{
                                borderRadius: "20px",
                                fontSize: "10px",
                                fontWeight: "800",
                              }}
                              className="btn btn-outline-danger"
                              onClick={()=>handleCancel(obj.id)}
                            >
                              Delete
                            </button>:""}
                            
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>

            <Modal show={show} onHide={handleClose} centered size="md">
              <Modal.Header closeButton>
                <Modal.Title>New Appointment</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-4">
                <select
                  name=""
                  id=""
                  style={{
                    border: "none",
                    borderBottom: "1px solid",
                    outline: "none",
                  }}
                  onChange={(e) => selectDoctorChange(e)}
                >
                  <option value="">Select Doctor</option>
                  {doctorData.map((obj, index) => (
                    <>
                      <option key={index} value={JSON.stringify(obj)}>
                        {obj.name}-{obj.specialty}
                      </option>
                    </>
                  ))}
                </select>
                <select
                  name=""
                  id=""
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
                  name=""
                  id=""
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
                  onClick={handleSave}
                >
                  Book Appointment
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal to edit profile */}
            <Modal show={edit} onHide={handleEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <input
                  type="text"
                  value={editdata.username}
                  style={{
                    border: "none",
                    borderBottom: "1px solid",
                    outline: "none",
                  }}
                  onChange={(e) => {
                    setEditdata({ ...editdata, username: e.target.value });
                  }}
                />
                <input
                  type="email"
                  value={editdata.email}
                  style={{
                    border: "none",
                    borderBottom: "1px solid",
                    outline: "none",
                  }}
                  onChange={(e) => {
                    setEditdata({ ...editdata, email: e.target.value });
                  }}
                />
                <input
                  type="text"
                  value={editdata.phonenumber}
                  style={{
                    border: "none",
                    borderBottom: "1px solid",
                    outline: "none",
                  }}
                  onChange={(e) => {
                    setEditdata({ ...editdata, phonenumber: e.target.value });
                  }}
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
        </div>
      </div>
    </>
  );
};

export default Patient;
