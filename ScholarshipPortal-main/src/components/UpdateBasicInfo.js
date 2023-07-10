import React, { useContext, useState } from 'react'
import { MenuItem } from "@mui/material";
import { appereancecontext } from '../context/Appereancestate';
import { studentcontext } from '../context/StudentState';
import TextField from "@mui/material/TextField";
import {toast } from 'react-toastify';
import validateContactNumber from '../helper/Contactvalidation';
import Cnicvalidation from '../helper/Cnicvalidation';

const UpdateBasicInfo = () => {

    const {bgcolor,color} = useContext(appereancecontext)
    const {thisStudent,updateThisStudent} = useContext(studentcontext)
    // const myref = useRef();
    // const myref2 = useRef();

    const departments = [
      "Civil Engineering",
      "Urban and Infrastructure Engineering",
      "Petroleum Engineering",
      "Mechanical Engineering",
      "Textile Engineering",
      "Industrial and Manufacturing Engineering",
      "Automotive and Marine Engineering",
      "Earthquake Engineering",
      "Electrical Engineering",
      "Computer and Information Systems Engineering",
      "Electronic Engineering",
      "Bio-Medical Engineering",
      "Telecommunications Engineering",
      "Software Engineering",
      "Computer Science & Information Technology",
      "Department of Mathematics",
      "Department of Physics",
      "Department of Chemistry",
      "English Linguistics & Allied Studies",
      "Department of Essential Studies",
      "Chemical Engineering",
      "Materials Engineering",
      "Metallurgical Engineering",
      "Polymer and Petrochemical Engineering",
      "Food Engineering",
      "Environmental Engineering",
      "Department of Architecture and Planning",
      "Department of Economics and Management Sciences",
      "Civil Engineering [TIEST]",
      "Computer Science and Technology [TIEST]"
    ];
    const semester = [
      "1st Semester",
      "2nd Semester",
      "3rd Semester",
      "4th Semester",
      "5th Semester",
      "6th Semester",
      "7th Semester",
      "8th Semester",
    ];
    const batch = [
      "2019",
      "2020",
      "2021",
      "2022"
    ];
    const degree = [
      "BS (Bachelor of Science)",
      "BE (Bachelor of Engineering)",
      "MS (Masters Programme)",
      "Ph.D."
    ];

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
    if(validateContactNumber(updatedinfo.contact) && Cnicvalidation(updatedinfo.cnic) && (updatedinfo.email.includes("@") && updatedinfo.email.split('@')[1] === "cloud.neduet.edu.pk" && updatedinfo.email.length > 0)){
      var check = await updateThisStudent(updatedinfo);
      console.log(check)
      if(check.acknowledged === true){
          toast.success("Your Information has been Successfully Updated!")
      }
      else{
          toast.error("Some Error occurred. Please try again later!")
      }
    }
    else{
      if(!Cnicvalidation(updatedinfo.cnic)){
        toast.error('Please enter a valid 14-digit CNIC number');
      }
      else if(!validateContactNumber(updatedinfo.contact)){
        toast.error('Please enter a valid 11-digit contact number');
      }
      else if(!updatedinfo.email.includes("@") || updatedinfo.email.split('@')[1] !== "cloud.neduet.edu.pk" || !updatedinfo.email.length > 0){
        toast.error('Please enter a valid email i.e. @cloud.neuet.edu.pk');
      }
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
                
                <TextField
                    sx={{ m: 1,width:"100%"}}
                    label="Select Options"
                    select
                    // size="small"
                    value={updatedinfo.stdegree}
                    name="stdegree"
                    onChange={updatehandler}
                    variant="filled"
                    SelectProps={{
                      MenuProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                  >
                  {degree.map((item, index)=>{
                    return <MenuItem value={item} key={index}>{item}</MenuItem>
                  })}
                </TextField>
                
                <TextField
                    sx={{ m: 1,width:"100%"}}
                    label="Select Options"
                    select
                    // size="small"
                    value={updatedinfo.stdepart}
                    name="stdepart"
                    onChange={updatehandler}
                    variant="filled"
                    SelectProps={{
                      MenuProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                  >
                  {departments.map((item, index)=>{
                    return <MenuItem value={item} key={index}>{item}</MenuItem>
                  })}
                </TextField>
                
                <TextField type='number' label="CGPA" name="stcgpa" value={updatedinfo.stcgpa} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-column">
            <TextField label="Last Name" name="lname" value={updatedinfo.lname} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="CNIC" name="cnic" value={updatedinfo.cnic} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Contact" name="contact" value={updatedinfo.contact} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                
                <TextField
                    sx={{ m: 1,width:"100%"}}
                    label="Select Options"
                    select
                    // size="small"
                    value={updatedinfo.stbatch}
                    name="stbatch"
                    onChange={updatehandler}
                    variant="filled"
                    SelectProps={{
                      MenuProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                  >
                  {batch.map((item, index)=>{
                    return <MenuItem value={item} key={index}>{item}</MenuItem>
                  })}
                </TextField>

                <TextField
                    sx={{ m: 1,width:"100%"}}
                    label="Select Options"
                    select
                    // size="small"
                    value={updatedinfo.stsem}
                    name="stsem"
                    onChange={updatehandler}
                    variant="filled"
                    SelectProps={{
                      MenuProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                  >
                  {semester.map((item, index)=>{
                    return <MenuItem value={item} key={index}>{item}</MenuItem>
                  })}
                </TextField>
            </div>
        <button className="btn btn-success w-25 my-4" type='submit'>Save</button>
        </div>
    </form>
      
    </>
  )
}

export default UpdateBasicInfo
