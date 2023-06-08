import React, { useContext, useRef, useState } from "react";
import { TextField, MenuItem,Checkbox } from "@mui/material";
// import Button from "@mui/material/Button";
import { studentcontext } from "../context/StudentState";
import { useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify';


export default function SSignUP2() {

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

  const {stcredential,setstcredential,stSignup} = useContext(studentcontext)
  const navigate = useNavigate()
  const spinnerref = useRef();
  const [checked,setchecked] = useState(false)

  const checkboxhandler = ()=>{
    if(checked === false){
      setchecked(true)
    }
    else{
      setchecked(false)
    }
  }

  const s1changehandler = (e)=>{
    setstcredential({...stcredential, [e.target.name]: e.target.value})
    console.log(stcredential)
  }
  
  const s2submithandler = async ()=>{
    spinnerref.current.classList.remove("d-none")
    const url = `http://localhost:5000/student/addstudent`
      
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stcredential)
    });
    const json = await response.json()
    console.log("final form submitted: ",json)
    if(json.success){
        localStorage.setItem("token",json.authtoken)
        spinnerref.current.classList.add("d-none")
        navigate("/login");
    }
    else{
      spinnerref.current.classList.add("d-none")
      toast.error(json?.error !==undefined? json?.error:"Some Error Occurred. Please Try Again Later!")
    }
    spinnerref.current.classList.add("d-none")
    
  }

  const signuphandler = (e)=>{
    e.preventDefault()
    stSignup(stcredential.email,s2submithandler)
  }

  return (
    <form onSubmit={signuphandler} action="submit">
    <div style={{height: "330px", overflowY: "scroll"}}>
      <h6 className="fs-5 fw-bold text-center">Fill this information</h6>
      <div className="container d-flex justify-content-center align-item-center flex-column">

        <div className="d-flex flex-row align-items-center my-1">
          <p className="fs-6 text-secondary mx-2 m-0">Type of Student:</p>
          <TextField
            sx={{
              flex: 1,
            }}
            label="Select Options"
            value={stcredential.sttype}
            name="sttype"
            onChange={s1changehandler}
            select
            size="small"
            variant="filled"
          >
          
            <MenuItem value="Merit-based">Merit Based</MenuItem>
            <MenuItem value="Need-Based">Need Based</MenuItem>
            <MenuItem value="Both">Based on Merit and Need</MenuItem>
          </TextField> 
        </div>

        

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Category of Addmission</p>
          <TextField required name="cao" onChange={s1changehandler} value={stcredential.cao} label="e.g R[a-1]" sx={{flex:2}} variant="filled" size="small" />
        </div>

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Roll No:</p>
          <TextField required name="rollno" onChange={s1changehandler} value={stcredential.rollno} label="e.g CT-20050" sx={{flex:1}} variant="filled" size="small" />
        </div>

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Select Department:</p>
          <TextField
              style={{flex: 1}}
              label="Select Options"
              select
              size="small"
              value={stcredential.stdepart}
              name="stdepart"
              onChange={s1changehandler}
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
        </div>

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Select Degree:</p>
          <TextField
            style={{
              flex: 1,
            }}
            label="Select Options"
            select
            size="small"
            variant="filled"
            value={stcredential.stdegree}
            name="stdegree"
            onChange={s1changehandler}
          >
            <MenuItem value="BS (Bachelor of Science)">BS (Bachelor of Science)</MenuItem>
            <MenuItem value="BE (Bachelor of Engineering)">BE (Bachelor of Engineering)</MenuItem>
            <MenuItem value="MS (Masters Programme)">MS (Masters Programme)</MenuItem>
            <MenuItem value="Ph.D.">Ph.D.</MenuItem>
          </TextField>
        </div>

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Select Academic Year:</p>
          <TextField
          style={{
              flex: 1,
            }}
            label="Select Options"
            select
            size="small"
            variant="filled"
            value={stcredential.styear}
            name="styear"
            onChange={s1changehandler}
          >
            <MenuItem value="1st Year">1st Year</MenuItem>
            <MenuItem value="2nd Year">2nd Year</MenuItem>
            <MenuItem value="3rd Year">3rd Year</MenuItem>
            <MenuItem value="4th Year">4th / Final Year</MenuItem>
          </TextField>
        </div>

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Select Semester(on-going):</p>
            <TextField
            style={{
              flex: 1,
            }}
            label="Select Options"
            select
            size="small"
            variant="filled"
            value={stcredential.stsem}
            name="stsem"
            onChange={s1changehandler}
          >
            <MenuItem value="1st Semester">1st Semester</MenuItem>
            <MenuItem value="2nd Semester">2nd Semester</MenuItem>
            <MenuItem value="3rd Semester">3rd Semester</MenuItem>
            <MenuItem value="4th Semester">4th Semester</MenuItem>
            <MenuItem value="5th Semester">5th Semester</MenuItem>
            <MenuItem value="6th Semester">6th Semester</MenuItem>
            <MenuItem value="7th Semester">7th Semester</MenuItem>
            <MenuItem value="8th Semester">8th Semester</MenuItem>
          </TextField>
        </div>

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Select Batch:</p>
          <TextField
          style={{
            flex: 1,
          }}
          label="Select Options"
          select
          size="small"
          variant="filled"
          value={stcredential.stbatch}
          name="stbatch"
          onChange={s1changehandler}
        >
          <MenuItem value="2019">2019</MenuItem>
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
        </TextField>
        </div>

        <div className="d-flex flex-row align-items-center my-2">
          <p className="fs-6 text-secondary mx-2 m-0">Select Current CGPA:</p>
          <TextField
          style={{
            flex: 1,
          }}
          label="Enter CGPA (e.g. 3.00)"
          size="small"
          variant="filled"
          type="text"
          value={stcredential.stcgpa}
          name="stcgpa"
          onChange={s1changehandler}
        />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center my-1">
          <Checkbox color="primary" checked={checked} onClick={checkboxhandler}/>
          <p className='fs-6 text-secondary m-0'>I agree to terms and conditions</p> 
        </div>
        <div className="container d-flex justify-content-center align-items-center">
            <button className="btn btn-success d-flex justify-content-center align-items-center mx-5 w-50" disabled={!checked} type="submit">
              <div class="spinner-border spinner-border-sm text-light d-none" ref={spinnerref} role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p className="fs-6 m-0 mx-2">SignUp</p>
            </button>
          </div>
      </div>
    </div>
    </form>
  );
};
