import React, { useContext, useEffect, useState } from 'react'
import { studentcontext } from '../../context/StudentState'
import { scholarshipcontext } from '../../context/Scholarshipstate'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import { useTheme } from '@emotion/react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { applicationcontext } from '../../context/ApplicationState';


const Applicationitem = ({item,index,setdata,changestatus,setstatus,searchval}) => {

    const theme = useTheme();

    const {fetchonestudent} = useContext(studentcontext)
    const {fetchonescholarship} = useContext(scholarshipcontext)
    // const {editapplication} = useContext(applicationcontext)

    
    const [indst,setindst] = useState([]);
    const [indsc,setindsc] = useState([]);
    const fetchinddata = async ()=>{
        const indst = await fetchonestudent(item?.stid);
        setindst(indst)
        const indsc = await fetchonescholarship(item?.scid);
        setindsc(indsc)
        console.log(indsc)
    }

    useEffect(()=>{
        fetchinddata();
    },[])
    
    const handleChange = (event) => {
        setstatus(event.target.value);
    };



  return (
    <>
    
    {((indst[0]?.fname.toLowerCase().includes(searchval.toLowerCase()) || indst[0]?.fname.toLowerCase().includes(searchval.toLowerCase()) ) && searchval !=="") &&<tr style={{color:theme.palette.mode === "dark"&&theme.palette.grey[100]}}>
        <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td><a href="/" onClick={()=>{setdata(indst[0])}} data-bs-toggle="modal"  data-bs-target="#exampleModal" style={{textDecoration:"none"}}>{indst[0]?.fname !== undefined? indst[0]?.fname:"Loading..."} {indst[0]?.lname}</a></td>
        <td>{indst[0]?.rollno !== undefined? indst[0]?.rollno:"Loading..."}</td>
        <td>{indsc?.name !== undefined? indsc?.name:"Loading..."}</td>
        <td>{item?.date?.slice(0,10) !== undefined? item?.date?.slice(0,10) :"Loading..."}</td>
        <td style={{width:"100px"}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={item.status}
                    onChange={handleChange}
                    label="Status"
                    >
                    <MenuItem value="Pending" data-bs-toggle="modal" data-bs-target="#appsmodal" onClick={()=>{changestatus("Pending",item._id,indst[0]?.email)}}>Pending</MenuItem>
                    <MenuItem value="Approved" data-bs-toggle="modal" data-bs-target="#appsmodal" onClick={()=>{changestatus("Approved",item._id,indst[0]?.email)}}>Approved</MenuItem>
                    <MenuItem value="Rejected" data-bs-toggle="modal" data-bs-target="#appsmodal" onClick={()=>{changestatus("Rejected",item._id,indst[0]?.email)}}>Rejected</MenuItem>
                    </Select>
                </FormControl>
        </td>
    </tr>}
    {( searchval ==="") &&<tr style={{color:theme.palette.mode === "dark"&&theme.palette.grey[100]}}>
        <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td><a href="/" onClick={()=>{setdata(indst[0])}} data-bs-toggle="modal"  data-bs-target="#exampleModal" style={{textDecoration:"none"}}>{indst[0]?.fname !== undefined? indst[0]?.fname:"Loading..."} {indst[0]?.lname}</a></td>
        <td>{indst[0]?.rollno !== undefined? indst[0]?.rollno:"Loading..."}</td>
        <td>{indsc?.name !== undefined? indsc?.name:"Loading..."}</td>
        <td>{item?.date?.slice(0,10) !== undefined? item?.date?.slice(0,10) :"Loading..."}</td>
        <td style={{width:"100px"}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={item.status}
                    onChange={handleChange}
                    label="Status"
                    >
                    <MenuItem value="Pending" data-bs-toggle="modal" data-bs-target="#appsmodal" onClick={()=>{changestatus("Pending",item._id,indst[0]?.email)}}>Pending</MenuItem>
                    <MenuItem value="Approved" data-bs-toggle="modal" data-bs-target="#appsmodal" onClick={()=>{changestatus("Approved",item._id,indst[0]?.email)}}>Approved</MenuItem>
                    <MenuItem value="Rejected" data-bs-toggle="modal" data-bs-target="#appsmodal" onClick={()=>{changestatus("Rejected",item._id,indst[0]?.email)}}>Rejected</MenuItem>
                    </Select>
                </FormControl>
        </td>
    </tr>}
      
    </>
  )
}

export default Applicationitem
