import React, { useState } from 'react';
import {Tabs,Tab,AppBar} from '@material-ui/core'
import StudentSignup from './StudentSignup'
import Supporters from './Supporters';

export default function StudentSignUp() {

  const [value,setValue]= useState(0)
  const handleTabs=(e,val)=>{
    console.warn(val)
    setValue(val)
  }

  return (
    <>
    <div className='container d-flex justify-content-center align-items-center mt-3'>
      <div className="container row d-flex justify-content-center align-items-center">
        <div className="col-sm-12 col-md-6 px-4" style={{borderRight:"1px solid #D7D7D7"}}>
          <h1 className="fs-2 fw-bold text-center my-4" style={{color:"#0F8A90"}}>Welcome To Scholar's Hub</h1>
          <AppBar position='static' className="custom-appbar" style={{backgroundColor: '#F1F9F9', color:'black',borderRadius:"10px"}}>
              <Tabs value={value} onChange={handleTabs}>
                <Tab label='Student' id="student-tab" aria-controls="student-panel" />
                <Tab label='Supporter' id="supporter-tab" aria-controls="supporter-panel" />
              </Tabs>
              <TabPanel value={value} index={0} id="student-panel" aria-labelledby="student-tab">
                  <StudentSignup/>
              </TabPanel>
              <TabPanel value={value} index={1} id="supporter-panel" aria-labelledby="supporter-tab">
                <Supporters/>
              </TabPanel>
          </AppBar> 
        </div>
        <div className="col-sm-12 col-md-6 p-5">
          <div className="container row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-center">
              <img className="img-fluid d-none d-md-flex" src={require("../asset/gaditek.png")} alt="" width="150px" height="150px"/> 
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-center">
              <img className="img-fluid d-none d-md-flex" src={require("../asset/NEDLogo.png")} alt="" width="150px" height="150px"/> 
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-center">
              <img className="img-fluid d-none d-md-flex" src="octdaily.png" alt="" width="150px" height="150px"/> 
            </div>
          </div>
          <div className="container row">
            <img className="img-fluid d-none d-md-flex" src="loginrightimg.png" alt=""/> 
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function TabPanel(props) 
{
  const{children,value,index,id}=props;
  return(
    <div role="tabpanel" hidden={value !== index} id={id} aria-labelledby={id}>
      {
        value===index && (
          <h1>{children}</h1>
        )
      }
    </div>
  )
}







