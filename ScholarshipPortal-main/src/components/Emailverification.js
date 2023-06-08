import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, TextField, Card, Button, Typography, IconButton, Avatar, InputLabel, Select, MenuItem, FormControl, CircularProgress, LinearProgress, Stepper, Step, StepLabel, Box } from "@mui/material";
import axios from "axios";
// import Man from '../assets/verify.svg'
// import Shape1 from '../assets/shape1.svg'
// import Shape2 from '../assets/shape2.svg'
// import Orders from '../assets/order.svg'
// import Logo from '../assets/check.svg'

export default function EmailVerification() {

    const { id } = useParams()
    const [message, setMessage] = useState()

    async function verify() {
        const res = await axios.get(`http://localhost:5000/student/verify/${id}`)
        setMessage(res?.data?.message)
        console.log('verification', res);
    }

    useEffect(() => {
        verify()
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
                    <img width={400} src={"Shape1"} alt='' style={{ position: "absolute", top: 60 }} />
                    {/* <img width={210} src={Orders} alt='' style={{ position: "absolute", left: 300, zIndex: 1000 }} /> */}
                    <img width={500} src={"Man"} alt='' className="image" />
                    <img width={400} src={"Shape2"} alt='' style={{ position: "absolute", top: 305 }} />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card style={{ boxShadow: "0px 0px 12px 9px rgb(161 151 151 / 15%)", borderRadius: "10px", padding: "20px 0 40px 0" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img width={60} src={"Logo"} alt="" />
                        </Box>
                        <Typography textAlign="center" variant="h5" marginTop="20px" marginBottom="20px">{message}</Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button variant="contained" style={{ fontSize: 14, height: 35, backgroundColor: "#37AB73", boxShadow:"none" }}>
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