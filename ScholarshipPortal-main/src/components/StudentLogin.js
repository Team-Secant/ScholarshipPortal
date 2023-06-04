import React, { useContext, useRef, useState } from 'react'
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Alert, Typography } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom'
import { studentcontext } from '../context/StudentState';

function StudentLogin() {

  const navigate = useNavigate()
  const {stlogin} = useContext(studentcontext)
  const [showPassword, setShowPassword] = React.useState(false);
  const alertref = useRef();
  const spinnerref = useRef();
  const [stSignin, setstSignin] = useState({"cnic":"", "email":"", "password":""});
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputhandler = (e)=>{
    setstSignin({...stSignin, [e.target.name]: e.target.value})
  }

  const signinsubmit = async ()=>{
    spinnerref.current.classList.remove("d-none")
    
    const url = `http://localhost:5000/student/login`
      
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(stSignin)
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem("token",json.authtoken)
            spinnerref.current.classList.add("d-none")

            navigate("/studentdashboard/home");
        }
        else{
          spinnerref.current.classList.add("d-none")
          alertref.current.classList.remove("d-none")
          setTimeout(() => {
            alertref.current.classList.add("d-none")
          }, 2000);
          clearTimeout();
        }
  }

  const loginhandler = (e)=>{
    e.preventDefault();
    stlogin(stSignin.email,signinsubmit);
  }


  return (
    <div className='mt-4' >
      <h4 className="text-center fw-bold">STUDENT SIGN IN</h4>
      <h6 className="text-center fs-6 m-0 p-0" style={{ color: "grey" }}>
        Please Login to Continue
      </h6>

    <div className="container">
      
    </div>

      <form onSubmit={loginhandler}>
        <div className="form-group" style={{height: "290px", overflowY: "scroll"}}>
          <div className="container d-flex justify-content-start flex-column px-5 mt-2">

              <Alert className='d-none' ref={alertref} severity="error">Please Enter Correct Credentials!</Alert>

              <label className="fs-6 mb-1">CNIC:</label>
              <TextField
                required
                label="e.g; 42XXX-XXXXXXX-X"
                variant="filled"
                size="small"
                name="cnic"
                value={stSignin.cnic}
                onChange={inputhandler}
              />

              <label className="fs-6 mt-3 mb-1">E-mail ID / GSuite-ID:</label>
              <TextField
                required
                label="e.g. abc123@cloud.neduet.edu.pk"
                variant="filled"
                size="small"
                name="email"
                value={stSignin.email}
                onChange={inputhandler}
              />

              <label className="fs-6 mt-3 mb-1">Password:</label>
              <FormControl
                // sx={{ m: 1, width: "75%", right: "-42px", top: "48px" }}
                variant="filled"
              >
                <InputLabel htmlFor="filled-adornment-password" required>
                  Password
                </InputLabel>
                <FilledInput
                  name="password"
                  value={stSignin.password}
                  onChange={inputhandler}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        // edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    position: "absolute",
                    right: "2px",
                    top: "55px",
                    cursor: "pointer",
                    color: "blue",
                  }}
                >
                  Forgot Password?
                </Typography>
              </FormControl>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-items-center flex-column">
                <div className="container d-flex justify-content-center align-items-center">
                  <button className="btn btn-success d-flex justify-content-center align-items-center mx-5 w-50" type="submit">
                    <div className="spinner-border spinner-border-sm text-light d-none" ref={spinnerref} role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="fs-6 m-0 mx-2">Login</p>
                  </button>
                </div>
          <p className="text-center fs-6 mt-2">You don't have any account? <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
      </form>
    </div>
  );
}

export default StudentLogin