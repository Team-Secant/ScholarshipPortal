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
import FormHelperText from "@mui/material/FormHelperText";
import { countriescontext } from "../context/Countries";
// import Button from "@mui/material/Button";
import {NavLink, useNavigate} from 'react-router-dom';
import { Alert } from "@mui/material";
import PasswordStrength from "./PasswordStrength";

export default function AlumniSignUp({usertype}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const {countries,countryCodes} = useContext(countriescontext)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const alumnialertref = useRef();
  const spinnerref = useRef();
  const navigate = useNavigate()

  const [poorpw, setpoorpw] = useState(false)
  const [weakpw, setweakpw] = useState(false)
  const [strongpw, setstrongpw] = useState(false)

  const [alumniinfo,setalumniinfo] = useState({
    "usertype": usertype,
    "fname": "",
    "lname": "",
    "incomeimg": "",
    "nationality": "",
    "cnic": "",
    "contact": "",
    "yog": "",
    "degree": "",
    "job": "",
    "occupation": "",
    "monthlyinc": "",
    "address": "",
    "postalcode": "",
    "email": "",
    "password": ""
})

  const alumniinfochanger = (e)=>{
    setalumniinfo({...alumniinfo, [e.target.name]:e.target.value})
    console.log(alumniinfo)
  }

  const filehandler = (event)=>{
    var fileName = event.target.value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile==="jpg" || extFile==="jpeg" || extFile==="png"){
        //TO DO
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            setalumniinfo({...alumniinfo, [event.target.name]:reader.result})
        })

    }else{
        alert("Only jpg/jpeg and png files are allowed!");
    }   
}

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [option, setOption] = useState("cnic");

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

    const [countryCode, setCountryCode] = useState('+92');

const handlePhoneNumberChange = (event) => {
  const value = event.target.value;
  setalumniinfo({...alumniinfo, "contact": event.target.value})
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

const submitHandler = async (e)=>{
  spinnerref.current.classList.remove("d-none")
  e.preventDefault();
  const url = `http://localhost:5000/alumni/addalumni`
      
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumniinfo)
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
      alumnialertref.current.classList.remove("d-none")
      setTimeout(() => {
        alumnialertref.current.classList.add("d-none")
      }, 2000);
      clearTimeout();
    }
}

  return (
    <>
    <div style={{ textAlign: "center" }}>
      <form onSubmit={submitHandler}> 
        <Box sx={{ display: "flex", flexDirection:"column"}}>
          <div>
            <h6 className="fs-5 text-bold text-center">AlUMNI SIGNUP FORM</h6>
            <h6 className="fs-6 text-secondary text-center">Please SignUp to Continue</h6>

            <div className="container d-flex flex-column">
              <TextField required label="First Name" name="fname" onChange={alumniinfochanger} sx={{ m: 1}} variant="filled" size="small" />

              <TextField required sx={{ m: 1}} name="lname" onChange={alumniinfochanger} label="Last Name" variant="filled" size="small"/>
              
              <TextField required label="GSuite ID / Email ID" name="email" onChange={alumniinfochanger} sx={{ m: 1}} variant="filled" size="small" type="email" />

              <FormControl sx={{ m: 1}} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <FilledInput name="password" onChange={alumniinfochanger} onInput={checkpassstrength} type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }/>
                    {alumniinfo.password.length>0&&<PasswordStrength poorpw={poorpw} weakpw={weakpw} strongpw={strongpw}/>}
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


                <div style={{ display: "flex" }}>
                    <TextField required sx={{ m: 1,flex:1}} name="yog" onChange={alumniinfochanger} label="Year of Graduation" variant="filled" size="small"/>
                    <TextField required sx={{ m: 1,flex:1}} name="degree" onChange={alumniinfochanger} label="Degree" variant="filled" size="small"/>
                </div>
                <div style={{ display: "flex" }}>
                    <TextField required sx={{ m: 1,flex:1}} name="job" onChange={alumniinfochanger} label="Job Title" variant="filled" size="small"/>
                    <TextField required sx={{ m: 1,flex:1}} name="occupation" onChange={alumniinfochanger} label="Occupation" variant="filled" size="small"/>
                </div>

                <div className="container d-flex justify-content-center align-items-center flex-row">
                    <Autocomplete id="country-select-demo" sx={{flex:1,mr:2}} size="large" options={countries} autoHighlight getOptionLabel={(option) => option.label} onChange={(event, newValue) => {setalumniinfo({...alumniinfo, "nationality": newValue?.label})}}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} >
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField required {...params} variant="filled" name="nationality" label="Nationality" 
                          inputProps={{...params.inputProps,autoComplete: "new-password",}}
                        />
                      )}/>
                      <FormHelperText sx={{flex:1}}>Warning: Overseas and dual national Pakistanis must
                              select 'Pakistan' as their Country of Nationality</FormHelperText>
                  </div>
              

                <FormControl className="d-flex flex-row" sx={{m:1}}>
                  <select className="form-select form-select-sm mx-2" id="option" aria-label=".form-select-sm example" value={option} onChange={handleOptionChange} style={{backgroundColor:"transparent",flex:"1"}}>
                    <option value="cnic">CNIC</option>
                  </select>
                  <TextField label="eg: 4XXXX-XXXXXXX-X" name="cnic" onChange={alumniinfochanger} variant="filled" size="large" required />
                </FormControl>

                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div className="d-flex justify-content-center align-items-center flex-row">
                      <TextField required name="monthlyinc" onChange={alumniinfochanger} label="Monthly Income in Rupees"  sx={{ m: 1,flex:1}} inputMode="numeric" variant="filled" size="small" inputProps={{ min: 45000, step: 1 }} error={alumniinfo.monthlyinc<45000 && alumniinfo.monthlyinc>0} />
                      <FormHelperText sx={{flex:1}}>Monthly income must be at least Rs. 45,000</FormHelperText>
                  </div>
                  <div className="container">
                    <FormHelperText className="my-2">Note: Write your Monthly Income in rupees & Upload your Income payslip</FormHelperText>
                    <input type="file" name="incomeimg" onChange={filehandler} accept="image/*" className="form-control my-2" id="inputGroupFile01" style={{backgroundColor:"transparent"}}/>
                  </div>
                </div>  

                <div style={{ display: "flex" }}>
                    <TextField required label="Postal Code" name="postalcode" onChange={alumniinfochanger} sx={{ m: 1,flex:1}} variant="filled" size="small" inputMode="numeric" />
                    <TextField required id="filled-basic" name="address" onChange={alumniinfochanger} label="Residential Address" sx={{ m: 1,flex:2}} variant="filled" size="small" />
                </div>

                <div style={{ display: "flex" }}>
                    <Autocomplete sx={{ m: 1,flex:1}} id="country-code-select" size="large" options={countryCodes} getOptionLabel={(option) => option.label} value={countryCodes.find((option) => option.value === countryCode)}
                      onChange={(event, newValue) => {if (newValue) {setCountryCode(newValue.value);}}}
                      renderInput={(params) => (<TextField {...params} label="Country Code" variant="filled" />)}
                    />  
                    <TextField sx={{ m: 1,flex:1}} label="Contact Number" name="contact" variant="filled" size="large" required inputMode="numeric" pattern="^[0-9]{10}$" onChange={handlePhoneNumberChange} className="mx-2" />
                </div>

              <Alert className='d-none mt-1' ref={alumnialertref} severity="error">Some Error Occured! Please Try Again Later.</Alert>

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

            
  </>
  );
}
