import React, { useEffect, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import styled from '@emotion/styled';
// import { getScholarships, deleteScholarship } from "../../state/api.js"
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { scholarshipcontext } from '../../context/Scholarshipstate';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ConfirmationModal from './ConfirmationModal';

const AllUsers = () => {

    const {fetchallscholarship,allscholarship,dltscholarship} = useContext(scholarshipcontext)
    // const [scholarships] = useState([])

    useEffect(() => {
        fetchallscholarship();
    })


    const [status, setstatus] = React.useState('');
    const [scid, setscid] = React.useState('');

    const handleChange = (event) => {
        setstatus(event.target.value);
    };

    const changestatus = (status,id)=>{
        setstatus(status); 
        setscid(id);
    }

    return (
        <>
            <Box m="1.5rem 2.5rem" >
                <Header
                    title="SCHOLARSHIP REQUESTS"
                    subtitle="View Pending scholarship here and Approve it"
                />

                {/* <div className="container">
                    <Button color="secondary" variant="contained" sx={{ float: "right", fontSize: "15px"}} component={NavLink} to={'add'}><AddIcon />Add Scholarship</Button>
                </div> */}
                </Box>

            <ConfirmationModal status={status} id={scid}/>
            <TABLEBODY>
                <TableHead className='tablehead'>
                    <TableCell>Scholarship</TableCell>
                    <TableCell>Description</TableCell>
                    {/* <TableCell>Active</TableCell> */}
                    <TableCell>Min income</TableCell>
                    <TableCell>Min CGPA</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Award</TableCell>
                    <TableCell>Last Date</TableCell>
                    <TableCell>Status</TableCell>
                </TableHead>

                <TableBody>
                    {allscholarship.filter((each)=>{return each.status ==="pending"}).map((currElem) => {
                        return (
                            <TableRow key={currElem._id} className='tablerow'>
                                <TableCell>{currElem.name}</TableCell>
                                <TableCell>{currElem.description.slice(0,10)}...</TableCell>
                                {/* <TableCell><span className="badge" style={{backgroundColor:currElem.active?"#A8FFC2":"#FFD6D6",color:currElem.active?"green":"#E80000",border:"1px solid",borderColor:currElem.active?"green":"#E80000",borderRadius:"30px"}}>{`${currElem.active}`}</span></TableCell> */}
                                <TableCell>{currElem.minincome}</TableCell>
                                <TableCell>{currElem.mincgpa}</TableCell>
                                <TableCell>{currElem.sctype}</TableCell>
                                <TableCell>{currElem.award}</TableCell>
                                <TableCell>{currElem.lastdate}</TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={currElem.status}
                                        onChange={handleChange}
                                        label="Status"
                                        >
                                        <MenuItem value="pending" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{changestatus("pending",currElem._id)}}>Pending</MenuItem>
                                        <MenuItem value="approved" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{changestatus("approved",currElem._id)}}>Approved</MenuItem>
                                        <MenuItem value="rejected" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{changestatus("rejected",currElem._id)}}>Rejected</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>

                                {/* <TableCell>
                                    <Button sx={{my:2}} color="primary" variant="contained" component={NavLink} to={`edit/${currElem._id}`}>Edit</Button>
                                    <Button color="secondary" variant="contained" onClick={() => deleteScholarshipData(currElem._id)}>Delete</Button> 
                                </TableCell> */}

                            </TableRow>
                        )

                    })}


                </TableBody>
            </TABLEBODY>
            {allscholarship.filter((each)=>{return each.status ==="pending"}).length ===0&&
            <>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <img className='img-fluid' src={require("../../asset/searchimage.png")} alt="" width="300vw" height="auto"/>
                <h4 className='fs-4 fw-bold'>No Requests Found</h4>
            </div>
            </>
            }
        </>
    )
}


const TABLEBODY = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;

    

    .tablehead{
        & > th {            // table cells inspect mein th ha
        font-size: 18px;
        background: #0d696e;
        color: #FFFFFF;
    }
    }
    
    .tablerow{
        & > td{
        font-size: 15px;
        
    }
    }
`

export default AllUsers