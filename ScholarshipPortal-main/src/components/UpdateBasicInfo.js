import React, { useContext, useState, useRef } from 'react'
// import Box from '@mui/material/Box';
import { appereancecontext } from '../context/Appereancestate';
import { studentcontext } from '../context/StudentState';
import TextField from "@mui/material/TextField";
import Alert from '@mui/material/Alert';
import {toast } from 'react-toastify';


const UpdateBasicInfo = () => {

    const {bgcolor,color} = useContext(appereancecontext)
    const {thisStudent,updateThisStudent} = useContext(studentcontext)
    // const myref = useRef();
    // const myref2 = useRef();

    const [updatedinfo,setupdatedinfo] = useState(
    {"fname":thisStudent.fname,
    "email":thisStudent.email,
    "stdegree":thisStudent.stdegree,
    "stdepart":thisStudent.stdepart,
    "stcgpa":thisStudent.stcgpa,
    "lname":thisStudent.lname,
    "cnic":thisStudent.cnic,
    "contact":thisStudent.contact,
    "stbatch":thisStudent.stbatch,
    "stsem":thisStudent.stsem})


  const updatehandler = (e)=>{
    setupdatedinfo({...updatedinfo, [e.target.name]:e.target.value})
  }

  const updatestinfo = async (e)=>{
    e.preventDefault();
    var check = await updateThisStudent(updatedinfo);
    console.log(check)
    if(check.acknowledged === true){
        toast.success("Your Information has been Successfully Updated!")
    }
    else{
        toast.error("Some Error occurred. Please try again later!")
    }
  }

  return (
    <>
    {/* <Alert className='d-none' ref={myref} severity="success">Your Information has been Successfully Updated!</Alert>
    <Alert className='d-none' ref={myref2}  severity="error">Some Error occurred. Please try again later!</Alert> */}
    <h3 className='text-center mx-2 my-3'><span className="badge" style={{backgroundColor:bgcolor,color:color,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>Update Basic Information</span></h3>
    <form onSubmit={updatestinfo} className="container">
        <div className="row d-flex justify-content-center align-items-start">
            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-column">
                <TextField label="First Name" name="fname" value={updatedinfo.fname} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Email" name="email" value={updatedinfo.email} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Degree" name="stdegree" value={updatedinfo.stdegree} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Department" name="stdepart" value={updatedinfo.stdepart} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="CGPA" name="stcgpa" value={updatedinfo.stcgpa} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
               
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-column">
            <TextField label="Last Name" name="lname" value={updatedinfo.lname} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="CNIC" name="cnic" value={updatedinfo.cnic} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Contact" name="contact" value={updatedinfo.contact} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Batch" name="stbatch" value={updatedinfo.stbatch} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Semester" name="stsem" value={updatedinfo.stsem} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
            </div>
        <button className="btn btn-success w-25 my-4" type='submit'>Save</button>
        </div>
    </form>
      
    </>
  )
}

export default UpdateBasicInfo
