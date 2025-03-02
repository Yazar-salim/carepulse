import { Route, Routes } from "react-router-dom"
// import Registration from "./pages/Registration"
// import Login from "./pages/Login"
// import Patient from "./pages/Patient"
// import Doctor from "./pages/Doctor"
// import Header from "./components/Header"
import { routeelements } from "./constants/Constant"
import { Toaster } from "react-hot-toast"


function App() {
  

  return (
    <>
      {/* < Header/> */}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

      {
        routeelements.map((obj,index)=>(
          <Route key={index} element={obj.element} path={obj.path}></Route>
        ))
      }


        {/* <Route element={<Login/>} path='/'></Route>
        <Route element={<Registration/>} path="/registration"></Route>
        <Route element={<Patient/>} path="/patient"></Route>
        <Route element={<Doctor/>} path="/doctor"></Route> */}
      </Routes>
    </>
  )
}

export default App
