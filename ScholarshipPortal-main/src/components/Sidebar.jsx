import React from 'react'
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";

import {
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    ReceiptLongOutlined,
    AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
    {
        text: "Home",
        icon: <HomeOutlined />,
    },
    {
        text: "Student Details",      // topic
        icon: null,
    },
    {
        text: "Students",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Applications",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Add Announcement",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Scholarship Requests",
        icon: <AddTaskIcon />,
    },
    {
        text: "Add Scholarship",
        icon: <AddTaskIcon />,
    },
];

const navItemsfornotadmin = [
    {
        text: "Home",
        icon: <HomeOutlined />,
    },
    {
        text: "Student Details",      // topic
        icon: null,
    },
    {
        text: "Students",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Applications",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Add Scholarship",
        icon: <AddTaskIcon />,
    },
];

// passed these properties from layout page
const Sidebar = ({ user,drawerWidth,isSidebarOpen,setIsSidebarOpen,isNonMobile }) => {

    const { pathname } = useLocation();      // what page we are currently on
    const navigate = useNavigate();
    const theme = useTheme();

    // useeffect(()=>{
    //     if(localStorage.getItem("usertype") === "faculty"){

    //     }
    //     else if(localStorage.getItem("usertype") === "alumni"){

    //     }
    //     else if(localStorage.getItem("usertype") === "othermember"){

    //     }
    // })

    return (
    <Box component="nav">
        {isSidebarOpen && (
            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant="persistent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSixing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: drawerWidth,
                    },
                }}
            >

                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                {/* <Typography variant="h4" fontWeight="bold">
                                    ECOMVISION
                                </Typography> */}
                                <img className='img-fluid' src={require('../asset/NEDLogo.png')} alt="" />
                            </Box>
                            {/* close krne ke symbol */}
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>

                    {(localStorage.getItem("usertype") === "faculty")&&<List>
                        {navItems.map(({ text, icon }) => {
                            if (!icon) {
                                return (
                                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                        {text}
                                    </Typography>
                                );
                            }

                            const lcText = (text==="Add Scholarship"||text==="Add Announcement")? text.slice(4).toLowerCase():(text==="Scholarship Requests")? text.slice(12).toLowerCase():text.toLowerCase()

                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton onClick={() => {
                                        navigate(`/admindashboard/${lcText}`);
                                    }}
                                        sx={{
                                            // hove 
                                            backgroundColor: pathname === `/admindashboard/${lcText}` ? theme.palette.secondary[500] : "transparent",
                                            color: pathname === `/admindashboard/${lcText}` ? theme.palette.primary[100] : theme.palette.secondary[100],
                                        }}>

                                        {/* for icons */}
                                        <ListItemIcon
                                            sx={{
                                                ml: "2rem",
                                                color: pathname === `/admindashboard/${lcText}` ? theme.palette.primary[100] : theme.palette.secondary[200],
                                            }}>
                                            {icon}</ListItemIcon>
                                        <ListItemText primary={text} />

                                        {pathname === `/admindashboard/${lcText}` && (
                                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            )

                        }
                        )}
                    </List>}

                    {(localStorage.getItem("usertype") === "alumni"||localStorage.getItem("usertype") === "othermember")&&<List>
                        {navItemsfornotadmin.map(({ text, icon }) => {
                            if (!icon) {
                                return (
                                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                        {text}
                                    </Typography>
                                );
                            }

                            const lcText = (text==="Add Scholarship"||text==="Add Announcement")? text.slice(4).toLowerCase():text.toLowerCase()

                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton onClick={() => {
                                        navigate(`/admindashboard/${lcText}`);
                                    }}
                                        sx={{
                                            // hove 
                                            backgroundColor: pathname === `/admindashboard/${lcText}` ? theme.palette.secondary[500] : "transparent",
                                            color: pathname === `/admindashboard/${lcText}` ? theme.palette.primary[100] : theme.palette.secondary[100],
                                        }}>

                                        {/* for icons */}
                                        <ListItemIcon
                                            sx={{
                                                ml: "2rem",
                                                color: pathname === `/admindashboard/${lcText}` ? theme.palette.primary[100] : theme.palette.secondary[200],
                                            }}>
                                            {icon}</ListItemIcon>
                                        <ListItemText primary={text} />

                                        {pathname === `/admindashboard/${lcText}` && (
                                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            )

                        }
                        )}
                    </List>}
                </Box>
                

            </Drawer>
        )
        }
    </Box>
    )
}

export default Sidebar