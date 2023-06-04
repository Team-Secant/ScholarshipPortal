import React, { useContext, useRef, useState } from 'react'
import { FormControl, InputLabel, Input, FormGroup, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
// import { addScholarship } from "../../state/api";
import {useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { scholarshipcontext } from '../../context/Scholarshipstate';

const scholarshipDataType = [
    {
        value: 'Merit-Based',
        label: 'Merit Based',
    },
    {
        value: 'Need-Based',
        label: 'Need Based',
    },
    {
        value: 'Both',
        label: 'Both Based',
    },

];



const AddUser = () => {

    const spinnerref = useRef();
    const {addscholarship} = useContext(scholarshipcontext)
    const [scholarship, setScholarship] = useState({name: '',description: '',minincome: '',mincgpa: '',sctype:"",active:Boolean,award:"",lastdate:""});

    let navigate = useNavigate();


    const onValueChange = (e) => {
        console.log(e.target.value, e.target.name)
        setScholarship({ ...scholarship, [e.target.name]: e.target.value })  // you can declare let name,value and then [name]:value 
        // object is key value pair but here both key and values are variables so put key in []
    }

    const addUserDetails = async (e) => {
        e.preventDefault()
        spinnerref.current.classList.remove("d-none")
        await addscholarship(scholarship)
        spinnerref.current.classList.add("d-none")
        navigate('/admindashboard/scholarship');

    }
    return (
        <form onSubmit={addUserDetails}>
        <Formgroup>
            <Typography variant="h2">Add Scholarship</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name of scholarship</InputLabel>
                <Input name='name' onChange={(e) => onValueChange(e)} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input name='description' onChange={(e) => onValueChange(e)} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Minimum Income</InputLabel>
                <Input name='minincome' onChange={(e) => onValueChange(e)} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Minimum CGPA</InputLabel>
                <Input name='mincgpa' onChange={(e) => onValueChange(e)} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Scholarship Award in Rupees</InputLabel>
                <Input name='award' onChange={(e) => onValueChange(e)} />
            </FormControl>

            <FormControl>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Type"
                    name='sctype'
                    onChange={(e) => { onValueChange(e) }}

                // defaultValue="EUR"
                // helperText="Please select your currency"
                >
                    {scholarshipDataType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>

            <FormControl>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Activate Scholarship"
                    name='active'
                    onChange={(e) => { onValueChange(e) }}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </TextField>
            </FormControl>

            <FormControl>
                <TextField
                    id="outlined-number"
                    label="Ending Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name='lastdate' onChange={(e) => onValueChange(e)}
                />

            </FormControl>

            <div className="container d-flex justify-content-center flex-row my-5">
                <button className="btn btn-success d-flex justify-content-center align-items-center mx-4 w-50" type="submit">
                        <div class="spinner-border spinner-border-sm text-light d-none" ref={spinnerref} role="status">
                        <span class="visually-hidden">Loading...</span>
                        </div>
                        <p className="fs-6 m-0 mx-2"><AddIcon/>Add Scholarship</p>
                    </button>

                <Button sx={{ fontSize: "15px"}} color='primary' variant="contained" onClick={() => navigate('/admindashboard/scholarship')}><ArrowBackIcon />Back</Button>

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



export default AddUser