import React, { useState,useContext, useRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem } from "@material-ui/core";
import { Alert, Typography } from '@mui/material';
import { countriescontext } from "../context/Countries";
// import Button from "@mui/material/Button";
import {NavLink, useNavigate} from 'react-router-dom';
import PasswordStrength from "./PasswordStrength";

export default function FacultySignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {countries,countryCodes} = useContext(countriescontext)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [poorpw, setpoorpw] = useState(false)
  const [weakpw, setweakpw] = useState(false)
  const [strongpw, setstrongpw] = useState(false)
  const facalertref = useRef();
  const navigate = useNavigate()
  const spinnerref = useRef();

  const [facinfo,setfacinfo] = useState({
    "usertype": "faculty",
    "fname": "",
    "lname": "",
    "nationality": "",
    "cnic": "",
    "facdepart": "Faculty of Civil and Petroleum Engineering (CPL)",
    "contact": "",
    "email": "",
    "password": ""
})

const checkpassstrength = (e)=>{
  let pass = e.target.value;
  let passlength = pass.length;
  var alpharegExp = /[a-zA-Z]*/;
  var alphanumregExp = /(?=.*?[0-9])/;
  var symbolregExp = /(?=.*?[#?!@$%^&*-])/;

  let poorpass = alpharegExp.test(pass)
  let weakpass = alphanumregExp.test(pass)
  let strongPass = symbolregExp.test(pass)

  if(passlength <= 3 && (poorpass || weakpass || strongPass)){
    setpoorpw(true)
  }

  if(passlength>= 4 && poorpass && (weakpass || strongPass)){
    setweakpw(true)
  }
  else{
    setweakpw(false)
  }

  if(passlength>= 6 && (poorpass && weakpass) && strongPass){
    setstrongpw(true)
  }
  else{
    setstrongpw(false)
  }
}


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = useState("");
  const [option, setOption] = useState("cnic");

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const [countryCode, setCountryCode] = useState('+92');


  const handlePhoneNumberChange = (event) => {
    setValue(event.target.value)
    setfacinfo({...facinfo, "contact": event.target.value})

    if (value.startsWith('1')) {
      setCountryCode('+1');
    } else if (value.startsWith('44')) {
      setCountryCode('+44');
    } else if (value.startsWith('91')) {
      setCountryCode('+91');
    } else if (value.startsWith('880')) {
      setCountryCode('+880');
    } else if (value.startsWith('94')) {
      setCountryCode('+94');
    } else if (value.startsWith('971')) {
      setCountryCode('+971');
    } else if (value.startsWith('03')) {
      setCountryCode('+92');
    } else if (value.startsWith('92')) {
      setCountryCode('+92');
    } // add more country codes as needed
  };

  const facinfochanger = (e)=>{
    setfacinfo({...facinfo, [e.target.name]: e.target.value})
    console.log(facinfo)
  }

  const facsignup = async (e)=>{
  spinnerref.current.classList.remove("d-none")
    e.preventDefault()

    const url = `http://localhost:5000/faculty/addfaculty`
      
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(facinfo)
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
      facalertref.current.classList.remove("d-none")
      setTimeout(() => {
        facalertref.current.classList.add("d-none")
      }, 2000);
      clearTimeout();
    }
  }

  return (

    <div style={{ textAlign: "center" }}>
      <form onSubmit={facsignup}>
        <Box sx={{ display: "flex", flexDirection:"column"}}>
          <div>
            <h6 className="fs-5 text-bold text-center">FACULTY SIGNUP FORM</h6>
            <h6 className="fs-6 text-secondary text-center">Please SignUp to Continue</h6>

            <div className="container d-flex justify-content-center align-items flex-column">
              <TextField required label="First Name" name="fname" onChange={facinfochanger} sx={{ m: 1}} variant="filled" size="small" />

              <TextField required sx={{ m: 1}} label="Last Name" name="lname" onChange={facinfochanger} variant="filled" size="small"/>

              <FormControl sx={{ m: 1}} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <FilledInput name="password" onChange={facinfochanger} onInput={checkpassstrength} type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }/>
                    {facinfo.password.length>0&&<PasswordStrength poorpw={poorpw} weakpw={weakpw} strongpw={strongpw}/>}
              </FormControl>

              <FormControl sx={{ m: 1}} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                  <FilledInput name="cpassword" type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
              </FormControl>

                <TextField required label="GSuite ID / Email ID" name="email" onChange={facinfochanger} sx={{ m: 1}} variant="filled" size="small" type="email" />

                <Autocomplete id="country-select-demo" sx={{ m: 1}} name="nationality" size="large" options={countries} autoHighlight getOptionLabel={(option) => option.label} onChange={(event, newValue) => {setfacinfo({...facinfo, "nationality": newValue.label})}}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} >
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField required {...params} variant="filled" label="Nationality"
                      helperText={
                        (
                          <Typography variant="caption">
                            Warning: Overseas and dual national Pakistanis must
                            select 'Pakistan' as their Country of Nationality
                          </Typography>
                        )
                      }
                      inputProps={{...params.inputProps,autoComplete: "new-password",}}
                    />
                  )}/>

                <TextField sx={{m:1}} label="Select Faculty" name="facdepart" onChange={facinfochanger} value={facinfo.facdepart} select size="small" variant="filled" >                 
                  <MenuItem value="Faculty of Civil and Petroleum Engineering (CPL)" selected>Faculty of Civil and Petroleum Engineering (CPL)</MenuItem>
                  <MenuItem value="Faculty of Mechanical and Manufacturing Engineering (MME)">Faculty of Mechanical and Manufacturing Engineering (MME)</MenuItem>
                  <MenuItem value="Faculty of Electrical and Computer Engineering (ECE)">Faculty of Electrical and Computer Engineering (ECE)</MenuItem>
                  <MenuItem value="Faculty of Information Sciences and Humanities (ISH)">Faculty of Information Sciences and Humanities (ISH)</MenuItem>
                  <MenuItem value="Faculty of Chemical & Process Engineering (CPE)">Faculty of Chemical & Process Engineering (CPE)</MenuItem>
                  <MenuItem value="Faculty of Architecture & Management Sciences (AMS)">Faculty of Architecture & Management Sciences (AMS)</MenuItem>
                  <MenuItem value="Thar Institute of Engineering, Sciences & Technology (TIEST)">Thar Institute of Engineering, Sciences & Technology (TIEST)</MenuItem>
              </TextField>

                <FormControl className="d-flex flex-row" sx={{m:1}}>
                <select className="form-select form-select-sm" id="option" aria-label=".form-select-sm example" value={option} onChange={handleOptionChange} style={{backgroundColor:"transparent",flex:"1"}}>
                    <option value="cnic">CNIC</option>
                  </select>
                  <TextField sx={{flex:3, ml:2}} name="cnic" onChange={facinfochanger} label="eg: 4XXXX-XXXXXXX-X" variant="filled" size="large" required />
                </FormControl>

                <div style={{ display: "flex" }}>
                    <Autocomplete sx={{ m: 1,flex:1}} id="country-code-select" size="large" options={countryCodes} getOptionLabel={(option) => option.label} value={countryCodes.find((option) => option.value === countryCode)}
                      onChange={(event, newValue) => {if (newValue) {setCountryCode(newValue.value);}}}
                      renderInput={(params) => (<TextField {...params} label="Country Code" variant="filled" />)}
                    />  
                    <TextField sx={{ m: 1,flex:1}} label="Contact Number" name="contact" variant="filled" size="large" required pattern="^[0-9]{10}$" onChange={handlePhoneNumberChange} className="mx-2" />
                </div>

              <Alert className='d-none mt-1' ref={facalertref} severity="error">Some Error Occured! Please Try Again Later.</Alert>

              <div className="container d-flex justify-content-center align-items-center">
                  <button className="btn btn-success d-flex justify-content-center align-items-center mx-5 my-3 w-50" type="submit">
                    <div className="spinner-border spinner-border-sm text-light d-none" ref={spinnerref} role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="fs-6 m-0 mx-2">SignUp</p>
                  </button>
                </div>
            </div>
          </div>
          <div>
            <p className="fs-6 my-2">Already have an account ? <NavLink to="/login">Sign In</NavLink></p>
          </div>
        </Box>
      </form>
    </div>       
  );
}
