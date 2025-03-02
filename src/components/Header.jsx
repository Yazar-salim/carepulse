import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.svg";
import logout from "../assets/LogOut.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate=useNavigate()

  const logOut =()=>{
    localStorage.clear();
    navigate("/")

  }
  return (
    <div>
      <div className="">
        <Navbar style={{ backgroundColor: "#fff" }}>
          <Container>
            <Navbar.Brand className="d-flex justify-content-center align-items-center gap-2">
              <img
                alt=""
                src={logo}
                width="50"
                // height="30"
                className="d-inline-block align-top "
              />{" "}
              <h1 className="fs-2 fw-bold mt-1  " style={{ color: "#9153b0" }}>
                CarePulse
              </h1>
            </Navbar.Brand>
            <button
              style={{ backgroundColor: "#9153b0" }}
              className="btn text-white"
              onClick={logOut}
            >
              Logout{" "}
              <img
                className="ms-1"
                style={{ width: "15px" }}
                src={logout}
                alt=""
              />
            </button>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
