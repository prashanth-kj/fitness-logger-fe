import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Signup from "./component/Signup"
import Header from "./component/Header"
import Dashboard from "./component/Dashboard"
import Login from "./component/Login"
import Cardio from "./component/Cardio"
import Resistance from "./component/Resistance"
import History from "./component/History"
import ExcerciseDetails from "./component/ExcerciseDetails"
import Chart from "./component/Chart"
import ForgetPassword from "./component/ForgetPassword"
import ResetPassword from "./component/ResetPassword"
import ExercisePage from "./component/ExercisePage"
import ProtectedRoutes from './common/ProtectedRoutes'



function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<><ProtectedRoutes><Header/><Dashboard/></ProtectedRoutes></>}/>
          <Route  path="/exercise" element={<><Header/><ExercisePage/></>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/cardio"  element={<><Header/><Cardio/></>}/>
          <Route path="/resistance" element={<><Header/><Resistance/></>}/>
          <Route path="/history" element={<><Header/><History/></>}/>
          <Route  path="/exercise/:type/:id" element={<><Header/><ExcerciseDetails/></>}/>
          <Route path="/fitness-overview" element={<><Header/><Chart/></>}/>

          <Route path="/*" element={<Navigate to={'/login'}/>}/>

      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
