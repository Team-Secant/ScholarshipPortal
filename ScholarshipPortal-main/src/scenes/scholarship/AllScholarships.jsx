import React, { useEffect, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import styled from '@emotion/styled';
import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"
// import { getScholarships, deleteScholarship } from "../../state/api.js"
import { Box } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import { scholarshipcontext } from '../../context/Scholarshipstate';

const AllUsers = () => {

    const {fetchallscholarship,allscholarship,dltscholarship} = useContext(scholarshipcontext)
    // const [scholarships] = useState([])

    useEffect(() => {
        fetchallscholarship();
    })


    const deleteScholarshipData = async (id) => {
        await dltscholarship(id);
    }

    return (
        <>
            <Box m="1.5rem 2.5rem" >
                <Header
                    title="SCHOLARSHIP DATA"
                    subtitle="View any scholarship here and update it"
                />

                <div className="container">
                    <Button color="secondary" variant="contained" sx={{ float: "right", fontSize: "15px"}} component={NavLink} to={'add'}><AddIcon />Add Scholarship</Button>
                </div>
                </Box>


            <TABLEBODY>
                <TableHead className='tablehead'>
                    <TableCell>Scholarship</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Min income</TableCell>
                    <TableCell>Min CGPA</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Award</TableCell>
                    <TableCell>Last Date</TableCell>
                    <TableCell></TableCell>


                </TableHead>

                <TableBody>
                    {allscholarship.map((currElem) => {
                        return (
                            <TableRow key={currElem._id} className='tablerow'>
                                <TableCell>{currElem.name}</TableCell>
                                <TableCell>{currElem.description.slice(0,10)}...</TableCell>
                                <TableCell><span className="badge" style={{backgroundColor:currElem.active?"#A8FFC2":"#FFD6D6",color:currElem.active?"green":"#E80000",border:"1px solid",borderColor:currElem.active?"green":"#E80000",borderRadius:"30px"}}>{`${currElem.active}`}</span></TableCell>
                                <TableCell>{currElem.minincome}</TableCell>
                                <TableCell>{currElem.mincgpa}</TableCell>
                                <TableCell>{currElem.sctype}</TableCell>
                                <TableCell>{currElem.award}</TableCell>
                                <TableCell>{currElem.lastdate}</TableCell>

                                <TableCell>
                                    <Button sx={{my:2}} color="primary" variant="contained" component={NavLink} to={`edit/${currElem._id}`}>Edit</Button> {/* change it to currElem.id to use JSON Server */}
                                    <Button color="secondary" variant="contained" onClick={() => deleteScholarshipData(currElem._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                                </TableCell>

                            </TableRow>
                        )

                    })}


                </TableBody>
            </TABLEBODY>
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