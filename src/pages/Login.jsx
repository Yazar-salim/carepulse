import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getUserData } from "../service/allAPI";
import { Link, useNavigate } from "react-router-dom";
import registerlogo from "../assets/LoginLogo.svg";
import stets from '../assets/loginpic.svg'
import toast, { ToastBar } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const navigate = useNavigate();

  // console.log(role);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password ) {
      let response = await getUserData();

      // console.log(response);

      let user = response.data.find(
        (u) => u.email === email && u.password === password 
      );

      // console.log(user);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful! 🎉");
        // alert("Login Successfull");
        // console.log(user);
        
        user.role === "patient" ? navigate("/patient") : navigate("/doctor");
      } else {
        toast.error("Invalid credentials or role mismatch!")
        // alert("Invalid credentials or role mismatch!");
      }
    } else {
      toast.error("Please fill the Form")
      // alert("Please fill the Form");
    }
  };
  return (


    <>
      <div className="d-flex" style={{position:"relative"}}>
        <div
          style={{
            height: "100vh",
            width: "30%",
            // border: "1px solid",
            backgroundColor: "#9973AC",
            
          }}
          className="backgorund__color"
        >
          <img src={registerlogo} className="w-75 mb-5 m-auto" alt="" />
          <p className="text-white w-75 m-auto">
            “Healing is a journey we take together, patients with hope, doctors
            with care!”
          </p>

          <div style={{position:"absolute",top:"20%",left:"18%"}}>
            <img src={stets} style={{width:"250px",height:"500px"}} alt="" />
          </div>
        </div>

        <div style={{marginLeft:"20%",marginTop:"5%"}} className="">
          <h1 className="mt-5 mb-5" style={{color:"#9973AC",fontSize:"20px",fontWeight:"700"}}>Sign In</h1>
          <form action="" className="d-flex flex-column gap-4">
            
            <input
              type="email"
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
              style={{border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC"}}
            />
            
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC"}}

            />

            {/* <select
              name=""
              id=""
              
              style={{width: "350px",border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC"}}

              value={role}
            onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select> */}

            <Button
              className="mb-3"
              type="submit"
              onClick={(e) => handleLogin(e)}
              style={{backgroundColor:"#9973AC",border:"none"}}
            >
              Login
            </Button>

            <p style={{ fontSize: "14px", fontWeight: "700" }}>
              Don't have an account? <Link to="/registration" style={{color:"#9973AC"}}>Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
    // <div>
    //   <div
    //     style={{ width: "30%" }}
    //     className=" rounded m-auto shadow d-flex flex-column gap-5 px-3 py-3 mt-5"
    //   >
    //     <h1 className="text-center fw-bold py-3">Login</h1>
    //     <Form>
    //       <Form.Group className="mb-3" controlId="formBasicEmail">
    //         {/* <Form.Label>Email address</Form.Label> */}
    //         <Form.Control
    //           type="email"
    //           placeholder="Enter email"
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </Form.Group>

    //       <Form.Group className="mb-3" controlId="formBasicPassword">
    //         {/* <Form.Label>Password</Form.Label> */}
    //         <Form.Control
    //           type="password"
    //           placeholder="Password"
    //           on
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </Form.Group>

    //       <select
    //         name=""
    //         id=""
    //         style={{
    //           width: "100%",
    //           padding: "6px",
    //           color: "grey",
    //           outline: "none",
    //           border: "1px solid grey",
    //           borderRadius: "5px",
    //           marginBottom: "20px",
    //         }}
    //         value={role}
    //         onChange={(e) => setRole(e.target.value)}
    //       >
    //         <option value="">Role</option>
    //         <option value="patient">Patient</option>
    //         <option value="doctor">Doctor</option>
    //       </select>

    //       <Button
    //         variant="primary"
    //         className="mt-3 mb-3 w-100"
    //         onClick={(e) => handleLogin(e)}
    //       >
    //         Submit
    //       </Button>

    //      <h6> Dont have Account? <Link to='/registration'>Click here </Link></h6>
    //     </Form>
    //   </div>
    // </div>
  );
};

export default Login;
