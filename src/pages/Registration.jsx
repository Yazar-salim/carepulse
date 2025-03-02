import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerUser } from "../service/allAPI";
import { Link } from "react-router-dom";
import registerlogo from "../assets/LoginLogo.svg";
import stets from '../assets/loginpic.svg'

const Registration = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phonenumber: "",
    role: "",
  });

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      user.username &&
      user.password &&
      user.email &&
      user.phonenumber &&
      user.role
    ) {
      alert("Account Created Succesfully")
      try {
        await registerUser(user);
        setUser({
          username: "",
          password: "",
          email: "",
          phonenumber: "",
          role: "",
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please Fill the Form");
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
          <h1 className="mt-5" style={{color:"#9973AC",fontSize:"20px",fontWeight:"700"}}>Create Account</h1>
          <form action="" className="d-flex flex-column gap-4">
            <input
              type="text"
              placeholder="User Name"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              style={{border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC",marginTop:"10%"}}
            />
            <input
              type="email"
              placeholder="Email ID"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={{border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC"}}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={user.phonenumber}
              onChange={(e) =>
                setUser({ ...user, phonenumber: e.target.value })
              }
              style={{border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC"}}

            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              style={{border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC"}}

            />

            <select
              name=""
              id=""
              
              style={{width: "350px",border:"0px",borderBottom:"1px solid",outline:"none",color:"#9973AC"}}

              onChange={(e) => setUser({ ...user, role: e.target.value })}
              value={user.role}
            >
              <option value="">Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>

            <Button
              className="mb-3"
              type="submit"
              onClick={(e) => handleSubmit(e)}
              style={{backgroundColor:"#9973AC",border:"none"}}
            >
              Create Account
            </Button>

            <p style={{ fontSize: "14px", fontWeight: "700" }}>
              Already Have an Account? <Link to="/" style={{color:"#9973AC"}}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>

  );
};

export default Registration;
