import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";     // allows us to have template outlets
// import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
// import { useGetUserQuery } from "state/api";


const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");  // gives true false boolean so if its mobile screen it will be false
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    })
    // const userId = useSelector((state) => state.global.userId);       // index file sy userid get

    // const { data } = useGetUserQuery(userId);
    // console.log("🚀 ~ file: index.jsx:9 ~ data:", data)



    // agr desktop screen tw flex wrna mobile
    // material ui has a component box that allows you to pass css property , normally you have to pass sx
    return <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            // user={"data" || {}}
        />

        <Box flexGrow={1}>
            {/* they will be represented on every single page, outlet is going to represent whatever component is under it */}
            <NavBar isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                // user={"data" || {}} 
                />
            <Outlet />
        </Box>
    </Box>
}

export default Layout