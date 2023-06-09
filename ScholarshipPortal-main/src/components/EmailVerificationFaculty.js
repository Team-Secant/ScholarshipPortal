import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, TextField, Card, Button, Typography, IconButton, Avatar, InputLabel, Select, MenuItem, FormControl, CircularProgress, LinearProgress, Stepper, Step, StepLabel, Box } from "@mui/material";
import axios from "axios";
// import Man from '../assets/verify.svg'
// import Shape1 from '../assets/shape1.svg'
// import Shape2 from '../assets/shape2.svg'
// import Orders from '../assets/order.svg'
// import Logo from '../assets/check.svg'

export default function EmailVerificationFaculty() {

    const { id } = useParams()
    const [message, setMessage] = useState()

    // async function verify() {
    //     const res = await axios.get(`http://localhost:5000/student/verify/${id}`)
    //     setMessage(res?.data?.message)
    //     console.log('verification', res);
    // }

    const signinsubmit = async ()=>{  
        console.log(id)     
        const url = `http://localhost:5000/faculty/verify/${id}`
          
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
            });
            const json = await response.json()
            console.log(json)
            setMessage(json?.message)
            console.log('verification', json);
            
      }

    useEffect(() => {
        signinsubmit();
    }, [])

    return (
        <div className="main-bg">
            <Grid
                container
                style={{
                    padding: "0 50px",
                    alignItems: "center",
                    minHeight: "100vh",
                }}>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ position: "relative" }}>
                    <img width={600} src={require('../asset/verify.png')} alt=''/>
                    {/* <img width={210} src={Orders} alt='' style={{ position: "absolute", left: 300, zIndex: 1000 }} /> */}
                    {/* <img width={500} src={"Man"} alt='' className="image" />
                    <img width={400} src={"Shape2"} alt='' style={{ position: "absolute", top: 305 }} /> */}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "10px", padding: "20px 0 40px 0" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img width={100} src={require('../asset/NEDLogo.png')} alt="" />
                        </Box>
                        <Typography textAlign="center" variant="h5" marginTop="20px" marginBottom="20px">{message}</Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button variant="contained" style={{ fontSize: 14, height: 35, backgroundColor: "#139fa6", boxShadow:"none",color:"white" }}>
                                    back to login
                                </Button>
                            </Link>
                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}