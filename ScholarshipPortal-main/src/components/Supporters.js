import React from 'react'
import FacultySignUp from './FacultySignUp'
import AlumniSignUp from './AlumniSignUp'
import OtherPersonSignUp from './OtherPersonSignUp'
import SupporterLogin from './SupporterLogin'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
// import AlumniSignIn from './AlumniSignIn'
// import OtherPersonSignIn from './OtherPersonSignIn'


function Supporters() {

  const [usertype,setusertype] = useState("faculty");
  const location = useLocation();

  return (
    <div style={{height: "440px", overflowY: "scroll"}}>
      <h6 className='fs-4 text-center my-4'>Select Supporter Type:</h6> 
      <div className="container-fluid my-3 d-flex justify-content-center">
        <div className="btn-group btn-group-toggle" data-toggle="buttons" >
          <button className="btn mx-1" style={{backgroundColor:"#0F8A90", color:"white"}} disabled={usertype==="faculty"} onClick={()=>setusertype("faculty")}>Faculty Member</button>
          <button className="btn" style={{backgroundColor:"#0F8A90", color:"white"}} disabled={usertype==="alumni"} onClick={()=>setusertype("alumni")}>Alumni</button>
          {/* <button className="btn mx-1" style={{backgroundColor:"#0F8A90", color:"white"}} disabled={usertype==="othermember"} onClick={()=>setusertype("othermember")}>Other Person</button> */}
        </div>
      </div>
      {location.pathname === "/login"&&<SupporterLogin usertype={usertype}/>}
      {location.pathname === "/signup"&&
      <>
      {usertype==="faculty"&&<FacultySignUp usertype={usertype}/>}
      {usertype==="alumni"&&<AlumniSignUp usertype={usertype}/>}
      {/* {usertype==="othermember"&&<OtherPersonSignUp usertype={usertype}/>} */}
      </>
      }
  </div>

  )
}

export default Supporters