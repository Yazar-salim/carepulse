// import { createBrowserRouter } from "react-router-dom";
import Doctor from "../pages/Doctor";
import Login from "../pages/Login";
import Patient from "../pages/Patient";
import Registration from "../pages/Registration";
import Error from "../pages/Error";

export const routeelements = [
    
    { element: <Login />, path: "/" },
    { element: <Registration />, path: "/registration" },
    { element: <Patient />, path: "/patient" },
    { element: <Doctor />, path: "/doctor" },
    { element: <Error />, path: "*" }



]