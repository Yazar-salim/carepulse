import { useEffect, useState } from "react";
import Header from "../components/Header";
import doctor from "../assets/doctoredit.png";
import edit from "../assets/Edit.svg";
import background from "../assets/dcotorbackground.png";
import { doctorDataAPI, showAppointmentsPatient, updateAppointmentStatus } from "../service/allAPI";
import { Table } from "react-bootstrap";

const Doctor = () => {
  //setting state to store doctors appointment data
  const [appointmentData, setAppointmentData] = useState([]);
  // setting state to store doctors profile
  const [doctorDetails, setDoctorDetails] = useState([]);
  // const [updateid,setUpdateid]=useState(null);

  // state for accepting appointment by doctor
  // const [acceptReject , setAcceptReject]=useState({
  //   status:null
  // })
  useEffect(() => {
    getAppointmentDetails();
    doctordet();
  }, []);

  // console.log(appointmentData);

  const doctorLocalStorage = JSON.parse(localStorage.getItem("user"));

  // to find the length of the appointments
  let len = appointmentData.filter(
    (doctor) => doctor.doctorusername == doctorLocalStorage.username
  ).length;

  // (mm.map((obj)=>console.log(obj)));

  // function to get appointment details for doctor

  // to show appointments of the logined doctor in table
  const getAppointmentDetails = async () => {
    let res = await showAppointmentsPatient();
    setAppointmentData(res.data);
  };

  // to get doctor details to show in profile
  const doctordet = async () => {
    let response = await doctorDataAPI();
    setDoctorDetails(response.data);
  };

  const loginedDoctor = doctorDetails.find(
    (obj) => obj.username === doctorLocalStorage.username
  );
  console.log(loginedDoctor);


  // changing status of appointment using accept button
  const handleAccept =async(id)=>{
    console.log(id);
    
    // let pat = appointmentData.find((obj)=>obj.id === id)
    // console.log(pat.status);
    // setAcceptReject({status:"Accepted"})
    await updateAppointmentStatus(id,{status:"Accepted"})
    //  window.location.reload();
    getAppointmentDetails();
    // console.log(res.data);
    
    
    
  }

  //changing status to Rejected of appointment using reject button


  const handleReject =async(id)=>{
    // console.log(id);
    
    // let pat = appointmentData.find((obj)=>obj.id === id)
    // console.log(pat.status);
    // setAcceptReject({status:"Accepted"})
    await updateAppointmentStatus(id,{status:"Rejected"})
     
    // console.log(res.data);
    getAppointmentDetails();
    
    
  }
  // console.log(acceptReject);
  return (
    <div style={{ backgroundColor: "#D2C6C6" ,height:"100vh"}}>
      <Header />

      <div style={{ width: "85%", margin: "auto" }}>
        <div className="d-flex justify-content-center gap-3 py-3">
          {/* Doctors Profile */}
          <div
            style={{
              backgroundColor: "white",
              position: "relative",
              borderRadius: "10px",
              width: "50%",
              padding: "10px",
            }}
          >
            <div style={{ position: "absolute", left: "-5%", top: "30%" }}>
              <img style={{ width: "110px" }} src={doctor} alt="" />
            </div>
            <div
              className="d-flex justify-content-between align-items-center w-75"
              style={{ marginLeft: "15%", marginTop: "1%" }}
            >
              {" "}
              <h1 className="fs-5 ms-4 mt-2">{loginedDoctor?.name}</h1>{" "}
              {/* <img src={edit} alt="" /> */}
            </div>
            <div
              className="d-flex"
              style={{ marginLeft: "20%", marginTop: "2%" }}
            >
              <h1
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  color: "#9e5ebd",
                  width:"45%"
                }}
              >
                Department <br />
                <span style={{ fontSize: "1rem", color: "black" }}>
                  {loginedDoctor?.specialty}
                </span>
              </h1>

              <h1
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  color: "#9e5ebd",
                  marginLeft:"0%",
                  width:"70%"
                }}
              >
                Working Hours <br />
                <span style={{ fontSize: "1rem", color: "black" }}>
                  {/* {loguser.username} */} 08:00 AM - 02:00 PM
                </span>
              </h1>

               </div>
            <div className="d-flex" style={{ marginLeft: "20%" }}>
              
            <h1
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  color: "#9e5ebd",
                  width:"30%"
                 
                }}
              >
                Contact Number <br />
                <span style={{ fontSize: "1rem", color: "black" }}>
                  {/* {loguser.email} */}{doctorLocalStorage.phonenumber}
                </span>{" "}
              </h1>
           
              <h1
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  color: "#9e5ebd",
                  marginLeft: "10%",
                }}
              >
                Email <br />
                <span style={{ fontSize: "1rem", color: "black" }}>
                  {doctorLocalStorage.email}
                </span>{" "}
              </h1>
            </div>
          </div>

          {/* welcoming Doctor */}
          <div style={{ position: "relative", width: "40%", height: "170px" }}>
            <div style={{}}>
              <img
                src={background}
                alt=""
                style={{ width: "100%", height: "170px" }}
              />
            </div>

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
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              backgroundColor: "white",
              width: "20%",
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



      <div style={{background:"white",width:"85%",margin:"auto", padding:"20px",borderRadius:"10px"}}>
        <h6 style={{fontSize:"18px",fontWeight:"600",textDecoration:"underline"}}>Appointments</h6>
      <div
        className=" p-3"
        style={{ border: "1px solid #c18cdb ", borderRadius: "10px",backgroundColor:"white" }}
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
                Patient Name
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
                Status
              </th>
              <th
                style={{
                  padding: "10px",
                  backgroundColor: "#9153b0",
                  color: "white",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {
            
            appointmentData
              .filter(
                (doctor) => doctor.doctorusername == doctorLocalStorage.username
              )
              .map((obj, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px" }}>{i+1}</td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      paddingRight: "9%",
                    }}
                  >
                    {obj.appointmentDate}
                  </td>
                  <td style={{ padding: "10px" }}>{obj.patientName}</td>

                  <td
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      paddingRight: "9%",
                    }}
                  >
                    {obj.appointmentTime}
                  </td>
                    
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      // paddingRight: "9%",
                    }}
                  >
                    {obj.status == null?<span style={{color:"#d14d06",fontSize:"14px",fontWeight:"800"}}>Pending</span>:obj.status== "Accepted"?<span style={{color:"green",fontSize:"14px",fontWeight:"800"}}>Accepted</span>:<span style={{color:"red",fontSize:"14px",fontWeight:"800"}}>Rejected</span>}
                  </td>


                  <td style={{ padding: "10px", width: "200px" }}>

                    {/* Conditionally rendering buttons */}
                    {
                      obj.status==null?<>
                                          <button
                      className="btn btn-outline-success "
                      style={{
                        marginRight: "10px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        fontWeight: "800",
                      }}

                      onClick={()=>handleAccept(obj.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      style={{
                        borderRadius: "20px",
                        fontSize: "10px",
                        fontWeight: "800",
                      }}
                      onClick={()=>handleReject(obj.id)}
                    >
                      Reject
                    </button>
                      </>:""
                    }

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
