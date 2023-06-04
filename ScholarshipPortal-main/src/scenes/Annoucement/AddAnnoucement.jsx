import React, { useContext, useRef, useState } from 'react'
import { FormControl, InputLabel, Input, FormGroup, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
// import { addAnnoucement } from "../../state/api";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { announcementcontext } from '../../context/AnnouncementState';

const AddAnnoucement = () => {

    const spinnerref = useRef();
    const { addannounce } = useContext(announcementcontext)
    const [annoucement, setAnnoucement] = useState({
        "title": "",
        "description": ""
    });
    let navigate = useNavigate();


    const onValueChange = (e) => {
        console.log(e.target.value, e.target.name)
        setAnnoucement({ ...annoucement, [e.target.name]: e.target.value })  // you can declare let name,value and then [name]:value 
        // object is key value pair but here both key and values are variables so put key in []
    }

    const addUserDetails = async (e) => {
        e.preventDefault();
        spinnerref.current.classList.remove("d-none")
        await addannounce(annoucement);
        spinnerref.current.classList.add("d-none")
        navigate("/admindashboard/announcement")
    }
    return (
        <form onSubmit={addUserDetails}>
            <Formgroup>
                <Typography variant="h2">Add annoucement</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Title</InputLabel>
                    <Input name='title' onChange={(e) => onValueChange(e)} required />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        name='description' onChange={(e) => onValueChange(e)}
                        id="outlined-multiline-static"
                        label="Your Announcement"
                        multiline
                        rows={4}
                    />

                </FormControl>

                <div className='container d-flex justify-content-center align-items-center flex-row'>
                    <button className="btn btn-success d-flex justify-content-center align-items-center mx-5 my-3 w-50" type="submit">
                        <div class="spinner-border spinner-border-sm text-light d-none" ref={spinnerref} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p className="fs-6 m-0">Add Announcement</p>
                    </button>
                    <Button sx={{ fontSize: "15px", color: "#665429", background: "665420" }} variant="outlined" onClick={() => navigate('/admindashboard/announcement')}><ArrowBackIcon />Back</Button>
                </div>


            </Formgroup>
        </form>
    )
}


const Formgroup = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
 
    & > div {               // kehne ko form control ha but ha ye div
        margin-top: 20px;
    }
`



export default AddAnnoucement