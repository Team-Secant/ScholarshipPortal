import React,{useContext, useState} from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SSignUP1 from "./SSignUP1";
import SSignUP2 from "./SSignUP2";
import {NavLink} from 'react-router-dom';
import { studentcontext } from "../context/StudentState";

const steps = ["Personal Info", "Additional Info"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const {stcredential,setstcredential} = useContext(studentcontext)

  const [credential, setcredential] = useState({
    "usertype": "student",
    "cao": "",
    "fname": "",
    "lname": "",
    "province": "",
    "district": "",
    "resadd": "",
    "peradd": "",
    "fatherstat": "alive",
    "motherstat": "alive",
    "rollno": "",
    "cnic": "",
    "contact": "",
    "sttype": "",
    "stdepart": "",
    "stbatch": "",
    "stdegree": "",
    "stsem": "",
    "styear": "",
    "stcgpa": "",
    "email": "",
    "password": ""
})

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    e.preventDefault();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);

    }
    setstcredential(credential)
    console.log("form submitted: ", stcredential)

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const s1submithandler = (e)=>{
    
  // }

  return (
    <Box sx={{flex:1}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                sx={{
                  m: 2,
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <div>
              <h1 style={{ textAlign: "center"}}>
                Registration Completed
              </h1>
              {/* <img className="containere" src={img1} alt="" /> */}
            </div>
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 1 && <SSignUP2 />}
          <form onSubmit={handleNext}>
          {activeStep === 0 && <SSignUP1 credential={credential} setcredential={setcredential}/>}
          <Box
            sx={{ display: "flex", flexDirection: "row", px:4, py:2 }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Back
            </Button>

            <div className="container d-flex justify-content-center">
              <p className="fs-6 my-2">Already have an account ? <NavLink to="/login">Sign In</NavLink></p>
            </div>

            <Box sx={{ flex: "1 1 auto" }} />
            {(activeStep !== steps.length - 1) && <button type="submit" className="btn btn-outline-primary" >Next</button>}
          </Box>
          </form>
        </React.Fragment>
      )}
    </Box>
  );
}
