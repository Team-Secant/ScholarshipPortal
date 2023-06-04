import React, { useEffect, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import styled from '@emotion/styled';
import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"
// import { getAnnoucements, deleteAnnoucement } from "../../state/api.js"
import { Box } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import { announcementcontext } from '../../context/AnnouncementState';

const AllAnnoucement = () => {

    const {fetchallannounce,allannounce,dltannounce} = useContext(announcementcontext)

    useEffect(() => {
        fetchallannounce();
    })

    const deleteAnnoucementData = (id)=>{
        dltannounce(id);
    }


    return (
        <>
            <Box m="1.5rem 2.5rem" >
                <Header
                    title="ANNOUCEMENTS"
                    subtitle="View any annoucement here and update it"
                />
                <div className="container">
                    <Button color="secondary" variant="contained" sx={{ float: "right", fontSize: "15px"}} component={NavLink} to={'add'}><AddIcon />Add Annoucement</Button>
                </div>
            </Box>



            <TABLEBODY>
                <TableHead className='tablehead'>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>

                    <TableCell></TableCell>


                </TableHead>

                <TableBody>
                    {allannounce.reverse().map((currElem) => {
                        return (
                            <TableRow key={currElem._id} className='tablerow'>
                                <TableCell>{currElem.title}</TableCell>
                                <TableCell>{currElem.description}</TableCell>


                                <TableCell>
                                    <div className="container d-flex flex-row">
                                        <Button color="primary" variant="contained" sx={{mx:2}} component={NavLink} to={`edit/${currElem._id}`}>Edit</Button>
                                        <Button color="secondary" variant="contained" onClick={() => deleteAnnoucementData(currElem._id)}>Delete</Button>
                                    </div>
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

export default AllAnnoucement