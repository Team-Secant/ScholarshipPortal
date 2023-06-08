import React, { useContext, useState, useRef } from 'react'
// import Box from '@mui/material/Box';
import { appereancecontext } from '../context/Appereancestate';
import { studentcontext } from '../context/StudentState';
import TextField from "@mui/material/TextField";
import Alert from '@mui/material/Alert';
import {toast } from 'react-toastify';


const DepInfo = () => {

    const {bgcolor,color} = useContext(appereancecontext)
    const {updatedepinfo,depinfo} = useContext(studentcontext)
    
    // const myref = useRef();
    // const myref2 = useRef();

    const [updatedinfo,setupdatedinfo] = useState(
        {
            depname: depinfo.depname,
            deprel: depinfo.deprel,
            depoccup: depinfo.depoccup,
            depincome: depinfo.depincome,
            totalearner: depinfo.totalearner,
            famincome: depinfo.famincome,
            depcontact: depinfo.depcontact,
            depresadd: depinfo.depresadd,
            monetaryamount: depinfo.monetaryamount
        }
    )


  const updatehandler = (e)=>{
    setupdatedinfo({...updatedinfo, [e.target.name]:e.target.value})
  }

  const updatestinfo = async (e)=>{
    e.preventDefault();
    var check = await updatedepinfo(updatedinfo,depinfo._id);
    if(check.acknowledged === true){
      toast.success("Your Dependant's Information has been Successfully Updated!")
    }
    else{
      toast.error("Some Error occurred. Please try again later!")
    }
  }

  return (
    <>
    {/* <Alert className='d-none' ref={myref} severity="success">Your Information has been Successfully Updated!</Alert>
    <Alert className='d-none' ref={myref2}  severity="error">Some Error occurred. Please try again later!</Alert> */}
    <h3 className='text-center mx-2 my-3'><span className="badge" style={{backgroundColor:bgcolor,color:color,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>Fill Dependant's Information</span></h3>
    <form onSubmit={updatestinfo} className="container">
        <div className="row d-flex justify-content-center align-items-start">
            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-column">
                <TextField label="Dependant Name" name="depname" value={updatedinfo.depname} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Relation with Dependant" name="deprel" value={updatedinfo.deprel} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Dependant's Occupation" name="depoccup" value={updatedinfo.depoccup} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Dependant's income" name="depincome" value={updatedinfo.depincome} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Total earners in your family" name="totalearner" value={updatedinfo.totalearner} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
               
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-column">
                <TextField label="Family Income" name="famincome" value={updatedinfo.famincome} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Dependant's Residential Address" name="depresadd" value={updatedinfo.depresadd} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Dependant's Contact" name="depcontact" value={updatedinfo.depcontact} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
                <TextField label="Monetory Amount(In case of Guardian only)" name="monetaryamount" value={updatedinfo.monetaryamount} onChange={updatehandler} sx={{ m: 1,width:"100%"}} variant="filled"/>
            
            </div>
        <button className="btn btn-success w-25 my-4" type='submit'>Save</button>
        </div>
    </form>
      
    </>
  )
}

export default DepInfo
