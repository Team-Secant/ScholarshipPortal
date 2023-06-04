import React, { useRef } from "react";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Alert, Typography } from "@mui/material";
import { useNavigate,NavLink } from 'react-router-dom'

function SupporterLogin({usertype}) {

  const navigate = useNavigate()
  const ssalertref = useRef();
  const spinnerref = useRef();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [stSignin, setstSignin] = React.useState({"cnic":"", "email":"", "password":""});
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputhandler = (e)=>{
    setstSignin({...stSignin, [e.target.name]: e.target.value})
  }

  const signinsubmit = async (e)=>{
    spinnerref.current.classList.remove("d-none")
    e.preventDefault();
    const url = `http://localhost:5000/${usertype}/login`
      
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
        localStorage.setItem("usertype",usertype)
        spinnerref.current.classList.add("d-none")
        navigate("/admindashboard/home");
    }
    else{
      spinnerref.current.classList.add("d-none")
      ssalertref.current.classList.remove("d-none")
          setTimeout(() => {
            ssalertref.current.classList.add("d-none")
          }, 2000);
          clearTimeout();
    }
    
  }
  

  return (
    <div >
      {/* <h4 className="text-center fw-bold">SUPPORTER SIGN IN</h4> */}
      <h6 className="text-center fs-6" style={{ color: "grey" }}>
        Please Login to Continue
      </h6>

      <form onSubmit={signinsubmit}>
        <div className="form-group">
          <div className="container d-flex justify-content-start flex-column px-5">

              <label className="fs-6 mb-3">CNIC:</label>
              <TextField
                required
                id="filled-basic"
                label="e.g; 42XXX-XXXXXXX-X"
                variant="filled"
                size="small"
                name="cnic"
                value={stSignin.cnic}
                onChange={inputhandler}
              />

              <label className="fs-6 mt-3 mb-3">E-mail ID / GSuite-ID:</label>
              <TextField
                required
                label="e.g. abc123@gmail.com"
                variant="filled"
                size="small"
                name="email"
                value={stSignin.email}
                onChange={inputhandler}
              />

              <label className="fs-6 mt-3 mb-3">Password:</label>
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
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    mt:1,
                    mb:2,
                    cursor: "pointer",
                    color: "blue",
                  }}
                >
                  Forgot Password?
        
                </Typography>

                <Alert className='d-none' ref={ssalertref} severity="error">Please Enter Correct Credentials!</Alert>

                <div className="d-flex flex-column my-2">
                  <div className="container d-flex justify-content-center align-items-center">
                    <button className="btn btn-success d-flex justify-content-center align-items-center mx-5 w-50" type="submit">
                      <div className="spinner-border spinner-border-sm text-light d-none" ref={spinnerref} role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="fs-6 m-0 mx-2">Login</p>
                    </button>
                  </div>
                  <p className="text-center fs-6 my-3">Don't have any account? <NavLink to="/signup">Sign Up</NavLink></p>
                </div>
              </FormControl>
          </div> 
        </div>
      </form>
    </div>
  );
}

export default SupporterLogin;
