import { useEffect, useState } from "react";
import Header from "../components/Header";
import doctor from "../assets/doctoredit.png";
import edit from "../assets/Edit.svg";
import background from "../assets/dcotorbackground.png";
import {
  doctorDataAPI,
  showAppointmentsPatient,
  updateAppointmentStatus,
} from "../service/allAPI";
import { Table } from "react-bootstrap";

const Doctor = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);

  useEffect(() => {
    getAppointmentDetails();
    doctordet();
  }, []);

  const doctorLocalStorage = JSON.parse(localStorage.getItem("user"));

  let len = appointmentData.filter(
    (doctor) => doctor.doctorusername == doctorLocalStorage.username
  ).length;

  const getAppointmentDetails = async () => {
    let res = await showAppointmentsPatient();
    setAppointmentData(res.data);
  };

  const doctordet = async () => {
    let response = await doctorDataAPI();
    setDoctorDetails(response.data);
  };

  const loginedDoctor = doctorDetails.find(
    (obj) => obj.username === doctorLocalStorage.username
  );

  const handleAccept = async (id) => {
    await updateAppointmentStatus(id, { status: "Accepted" });
    getAppointmentDetails();
  };

  const handleReject = async (id) => {
    await updateAppointmentStatus(id, { status: "Rejected" });
    getAppointmentDetails();
  };

  return (
    <div style={{ backgroundColor: "#D2C6C6", minHeight: "100vh" }}>
      <Header />

      <div style={{ width: "85%", margin: "auto", padding: "20px 0" }}>
        <div className="row gy-3">
          {/* Doctors Profile */}
          <div className="col-12 col-md-12 col-lg-5">
            <div
              style={{
                backgroundColor: "white",
                position: "relative",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div style={{ position: "absolute", left: "-5%", top: "30%" }}>
                <img style={{ width: "110px" }} src={doctor} alt="" />
              </div>
              <div
                className="d-flex justify-content-between align-items-center w-75"
                style={{ marginLeft: "15%", marginTop: "1%" }}
              >
                <h1 className="fs-5 ms-4 mt-2">{loginedDoctor?.name}</h1>
              </div>
              <div
                className="d-flex flex-wrap"
                style={{ marginLeft: "20%", marginTop: "2%" }}
              >
                <div style={{ width: "45%" }}>
                  <h1
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      color: "#9e5ebd",
                    }}
                  >
                    Department <br />
                    <span style={{ fontSize: "1rem", color: "black" }}>
                      {loginedDoctor?.specialty}
                    </span>
                  </h1>
                </div>
                <div style={{ width: "45%" }}>
                  <h1
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      color: "#9e5ebd",
                    }}
                  >
                    Working Hours <br />
                    <span style={{ fontSize: "1rem", color: "black" }}>
                      08:00 AM - 02:00 PM
                    </span>
                  </h1>
                </div>
              </div>
              <div
                className="d-flex flex-wrap"
                style={{ marginLeft: "20%", marginTop: "2%" }}
              >
                <div style={{ width: "45%" }}>
                  <h1
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      color: "#9e5ebd",
                    }}
                  >
                    Contact Number <br />
                    <span style={{ fontSize: "1rem", color: "black" }}>
                      {doctorLocalStorage.phonenumber}
                    </span>
                  </h1>
                </div>
                <div style={{ width: "45%" }}>
                  <h1
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      color: "#9e5ebd",
                    }}
                  >
                    Email <br />
                    <span style={{ fontSize: "1rem", color: "black" }}>
                      {doctorLocalStorage.email}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Welcoming Doctor */}
          <div className="col-12 col-md-6 col-lg-4">
            <div style={{ position: "relative", height: "170px" }}>
              <img
                src={background}
                alt=""
                style={{ width: "100%", height: "170px", borderRadius: "10px" }}
              />
              <div style={{ position: "absolute", top: "40%", left: "5%" }}>
                <h1 className="fs-4 fw-bold text-white mb-3">
                  Good Morning {loginedDoctor?.name}
                </h1>
                <p
                  className="fw-semibold text-white"
                  style={{ fontSize: "12px" }}
                >
                  Have a nice day at work.
                </p>
              </div>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="col-12 col-md-6 col-lg-3">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                height: "170px",
              }}
            >
              <h5>Total</h5>
              <h1 style={{ color: "#c18cdb" }}>{len}</h1>
              <p>Appointments</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          width: "85%",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h6
          style={{
            fontSize: "18px",
            fontWeight: "600",
            textDecoration: "underline",
          }}
        >
          Appointments
        </h6>
        <div
          className="p-3"
          style={{
            border: "1px solid #c18cdb ",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <Table hover size="sm" responsive>
            <thead>
              <tr>
                <th>Sl no</th>
                <th>Appointment Date</th>
                <th>Patient Name</th>
                <th>Appointment Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentData
                .filter(
                  (doctor) =>
                    doctor.doctorusername == doctorLocalStorage.username
                )
                .map((obj, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td  style={{
                        padding: "10px",
                        textAlign: "right",
                        paddingRight: "12%",
                      }}>{obj.appointmentDate}</td>
                    <td>{obj.patientName}</td>
                    <td  style={{
                        padding: "10px",
                        textAlign: "right",
                        paddingRight: "12%",
                      }}>{obj.appointmentTime}</td>
                    <td>
                      {obj.status == null ? (
                        <span style={{ color: "#d14d06", fontWeight: "800" }}>
                          Pending
                        </span>
                      ) : obj.status == "Accepted" ? (
                        <span style={{ color: "green", fontWeight: "800" }}>
                          Accepted
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "800" }}>
                          Rejected
                        </span>
                      )}
                    </td>
                    <td>
                      {obj.status == null ? (
                        <>
                          <button
                            className="btn btn-outline-success me-2"
                            style={{ borderRadius: "20px", fontSize: "10px" }}
                            onClick={() => handleAccept(obj.id)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            style={{ borderRadius: "20px", fontSize: "10px" }}
                            onClick={() => handleReject(obj.id)}
                          >
                            Reject
                          </button>
                        </>
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
  );
};

export default Doctor;