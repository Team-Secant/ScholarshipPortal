import React, { useContext, useEffect, useState } from 'react'
import { studentcontext } from '../../context/StudentState'
import { scholarshipcontext } from '../../context/Scholarshipstate'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import { useTheme } from '@emotion/react';
import { applicationcontext } from '../../context/ApplicationState';


const Applicationitem = ({item,index}) => {

    const theme = useTheme();

    const {fetchonestudent} = useContext(studentcontext)
    const {fetchonescholarship} = useContext(scholarshipcontext)
    const {editapplication} = useContext(applicationcontext)

    const [statusval,setstatusval] = useState({status:item.status});
    const [indst,setindst] = useState([]);
    const [indsc,setindsc] = useState([]);
    const fetchinddata = async ()=>{
        const indst = await fetchonestudent(item?.stid);
        setindst(indst)
        const indsc = await fetchonescholarship(item?.scid);
        setindsc(indsc)
        console.log(item)
    }

    useEffect(()=>{
        fetchinddata();
    },[])

    const onValueChange = (e)=>{
        setstatusval({status:e.target.value})
        console.log(e.target.value)
        editapplication({status:e.target.value},item?._id)
    }

  return (
    <>
    <tr style={{color:theme.palette.mode === "dark"&&theme.palette.grey[100]}}>
        <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td>{indst[0]?.fname} {indst[0]?.lname}</td>
        <td>{indst[0]?.rollno}</td>
        <td>{indsc?.name}</td>
        <td>{item?.date?.slice(0,10)}</td>
        <td style={{width:"100px"}}>
            <FormControl>
                <TextField
                    id="outlined-select-currency"
                    select
                    // label={item?.status}
                    name='status'
                    style={{width:"100px"}}
                    value={statusval.status}
                    onChange={onValueChange}
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                </TextField>
            </FormControl>
        </td>
    </tr>
      
    </>
  )
}

export default Applicationitem
