import React, { useState,useContext } from "react";
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
import { Typography } from "@mui/material";
import { countriescontext } from "../context/Countries";
import PasswordStrength from './PasswordStrength';
// import { studentcontext } from "../context/StudentState";

export default function SSignUP1({credential,setcredential}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const {countryCodes} = useContext(countriescontext)

  const domain = credential.email.split('@');
  const [poorpw, setpoorpw] = useState(false)
  const [weakpw, setweakpw] = useState(false)
  const [strongpw, setstrongpw] = useState(false)


  const onchangecred = (e)=>{
    setcredential({...credential, [e.target.name]: e.target.value})
    console.log(credential)
  }

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const [value, setValue] = useState(null);
  const [option, setOption] = useState("cnic");

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setcredential({...credential, [event.target.name]: event.target.value})
    setPhoneNumber(value);
    if (value.startsWith("1")) {
      setCountryCode("+1");
    } else if (value.startsWith("44")) {
      setCountryCode("+44");
    } else if (value.startsWith("91")) {
      setCountryCode("+91");
    } else if (value.startsWith("880")) {
      setCountryCode("+880");
    } else if (value.startsWith("94")) {
      setCountryCode("+94");
    } else if (value.startsWith("971")) {
      setCountryCode("+971");
    } else if (value.startsWith("03")) {
      setCountryCode("+92");
    } else if (value.startsWith("92")) {
      setCountryCode("+92");
    } // add more country codes as needed
  };

  return (
    <div style={{ height: "330px", overflowY: "scroll", textAlign: "center" }}>
        <Box sx={{ display: "flex", flexDirection:"column"}}>
          <div>
            <h6 className="fs-5 text-bold text-center">STUDENT SIGNUP FORM</h6>
            <h6 className="fs-6 text-secondary text-center">Please SignUp to Continue</h6>

            <div className="container d-flex flex-column">
              <TextField
                required
                name="fname"
                label="First Name"
                sx={{ m: 1}}
                variant="filled"
                size="small"
                value={credential.fname}
                onChange={onchangecred}
              />
              <TextField
                required
                name="lname"
                sx={{ m: 1}}
                label="Last Name"
                variant="filled"
                size="small"
                value={credential.lname}
                onChange={onchangecred}
              />
                  <TextField
                    required
                    name="email"
                    label="GSuite ID / Email ID"
                    id="filled-basic"
                    sx={{ m: 1}}
                    variant="filled"
                    size="small"
                    value={credential.email}
                    onChange={onchangecred}
                    type="email"
                    error={(domain[1] !== "cloud.neduet.edu.pk" && credential.email.length > 0)}
                    helperText={
                      (domain[1] !== "cloud.neduet.edu.pk" && credential.email.length > 0) ? (
                        <Typography
                          variant="caption"
                          color="error"
                        >
                          Please use G-suit ID for signing up!
                        </Typography>
                      ) : null
                    }
                  />
              <FormControl sx={{ m: 1}} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <FilledInput
                    name="password"
                    value={credential.password}
                    onChange={onchangecred}
                    onInput={checkpassstrength}
                    type={showPassword ? 'text' : 'password'}
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
                  {credential.password.length>0&&<PasswordStrength poorpw={poorpw} weakpw={weakpw} strongpw={strongpw}/>}
                </FormControl>
              <FormControl sx={{ m: 1}} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                  <FilledInput
                    name="cpassword"
                    type={showPassword ? 'text' : 'password'}
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
                </FormControl>

                <FormControl className="d-flex justify-content-center align-items-center flex-row" sx={{m:1}}>
                    <TextField required name="district" value={credential.district} onChange={onchangecred} label="District" sx={{flex:1}} variant="filled" size="small" />
                    <TextField required name="province" value={credential.province} onChange={onchangecred} label="Province" sx={{ml:1,flex:1}} variant="filled" size="small" inputMode="numeric" />
                </FormControl>

                <div style={{ display: "flex", flexDirection:"column" }}>
                    <TextField required name="resadd" value={credential.resadd} onChange={onchangecred} label="Residential Address" sx={{ m: 1,flex:2}} variant="filled" size="small" />
                    <TextField required name="peradd" value={credential.peradd} onChange={onchangecred} label="Permanent Address" sx={{ m: 1,flex:1}} variant="filled" size="small"/>
                </div>
 
                <FormControl className="d-flex justify-content-center align-items-center flex-row" sx={{m:1}}>
                  <label className="fs-6 me-5" htmlFor="">Your Father: </label>
                  <select className="form-select form-select-sm" aria-label=".form-select-sm example" name="fatherstat" onChange={onchangecred} style={{backgroundColor:"transparent",flex:"1"}}>
                      <option value="alive">Alive</option>
                      <option value="deceased">Deceased</option>
                      <option value="retired">Retired</option>
                      <option value="services">In Services</option>
                      <option value="business">Business</option>
                      {/* <option value="pos">Passport</option> */}
                    </select>
                </FormControl>

                <FormControl className="d-flex justify-content-center align-items-center flex-row" sx={{m:1}}>
                  <label className="fs-6 me-5" htmlFor="">Your Mother: </label>
                  <select className="form-select form-select-sm" aria-label=".form-select-sm example" name="motherstat" onChange={onchangecred} style={{backgroundColor:"transparent",flex:"1"}}>
                      <option value="alive">Alive</option>
                      <option value="deceased">Deceased</option>
                      <option value="retired">Retired</option>
                      <option value="services">In Services</option>
                      <option value="business">Business</option>
                      {/* <option value="pos">Passport</option> */}
                    </select>
                </FormControl>

                <FormControl className="d-flex flex-row" sx={{m:1}}>
                  <select className="form-select form-select-sm" id="option" aria-label=".form-select-sm example" value={option} onChange={handleOptionChange} style={{backgroundColor:"transparent",flex:"1"}}>
                      <option value="cnic">CNIC</option>
                      {/* <option value="pos">Passport</option> */}
                    </select>
                    <TextField sx={{flex:3, ml:2}} name="cnic" onChange={onchangecred} label={option === "cnic" ? "eg: 4XXXX-XXXXXXX-X" : "e.g: ANXS51330"} variant="filled" size="large" required />
                </FormControl>

                <div style={{ display: "flex" }}>
                    <Autocomplete sx={{ m: 1,flex:1}} id="country-code-select" size="large" options={countryCodes} getOptionLabel={(option) => option.label} value={countryCodes.find((option) => option.value === countryCode)}
                      onChange={(event, newValue) => {if (newValue) {setCountryCode(newValue.value);}}}
                      renderInput={(params) => (<TextField {...params} label="Country Code" variant="filled" />)}
                    />  
                    <TextField sx={{ m: 1,flex:1}} name="contact" label="Contact Number" variant="filled" size="large" required pattern="^[0-9]{10}$" value={phoneNumber} onChange={handlePhoneNumberChange} className="mx-2" />
                </div>
            </div>
          </div>
        </Box>
    </div>
  );
}

