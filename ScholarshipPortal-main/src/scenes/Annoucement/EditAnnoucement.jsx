import React, { useState, useEffect, useContext } from 'react'
import { FormControl, InputLabel, Input, FormGroup, Typography, Button, Box } from '@mui/material';
import styled from '@emotion/styled';
// import { getAnnoucement, editAnnoucement } from 'state/api';
import { useNavigate, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { announcementcontext } from '../../context/AnnouncementState';


const EditAnnoucement = () => {

    const {fetchoneannounce,editannounce} = useContext(announcementcontext)
    // const [initial,setinitial] = useState({title:"",description:""})
    // const [show,setshow] = useState(false)
    let navigate = useNavigate();
    const { id } = useParams()

    const fetchmyannounce = async ()=>{
      const oneannounce = await fetchoneannounce(id);
      setAnnoucement({title:oneannounce.title,description:oneannounce.description})
    }
    useEffect(() => {
        // eslint-disable-next-line 
        fetchmyannounce();
    },[]);

    const [annoucement, setAnnoucement] = useState({title: "", description:  ""});



    const onValueChange = (e) => {
        console.log(e.target.value, e.target.name)
        setAnnoucement({ ...annoucement, [e.target.name]: e.target.value })  // you can declare let name,value and then [name]:value 
        // object is key value pair but here both key and values are variables so put key in []
    }

    const EditUserDetails = async () => {
        await editannounce(annoucement, id)
        navigate('/admindashboard/announcement');
    }

    return (
        <>
        {annoucement.title!==""?<Formgroup>
            <Typography variant="h2">Edit annoucement</Typography>

            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input name='title' onChange={(e) => onValueChange(e)} value={annoucement.title} />
            </FormControl>

            <FormControl>


                <TextField
                    name='description' onChange={(e) => onValueChange(e)}
                    id="outlined-multiline-static"
                    label="Annoucement"
                    multiline
                    rows={6}
                    defaultValue="Write the annoucement here"
                    value={annoucement.description}
                />

            </FormControl>

            <div className="container d-flex justify-content-center">
                <Button sx={{ fontSize: "15px",mx:2}} variant="contained" color="success" onClick={() => EditUserDetails()}>Save Changes</Button>
                <Button sx={{ fontSize: "15px"}} variant="contained" color="primary" onClick={() => navigate('/admindashboard/announcement')}><ArrowBackIcon />Back</Button>
            </div>

        </Formgroup>:
        <Box m="1.5rem 2.5rem">
            <div className="container d-flex justify-content-center align-items-center">
                <h6 className='fs-6 fw-bold'>Loading...</h6>
            </div>
        </Box>}
        </>
    )
}


const Formgroup = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
 
    & > div {               // kehne ko form control ha but ha ye div
        margin-top: 20px;
    }
`



export default EditAnnoucement