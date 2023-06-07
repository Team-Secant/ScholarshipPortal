import React, { useEffect, useState } from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from "@mui/icons-material";     // these are icons
import FlexBetween from "../components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";      // we created allows to change dark to light
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';


// getting properties so on click the sidebar gets close
const NavBar = ({isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme()
    const navigate = useNavigate();

    const [thisfaculty, setthisfaculty] = useState();
    const fetchThisfaculty = async ()=>{

        const url = `http://localhost:5000/faculty/getfaculty`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setthisfaculty(json)
  }

    useEffect(()=>{
        fetchThisfaculty();
    })

    

    // const [anchorEl, setAnchorEl] = useState(null);
    // const isOpen = Boolean(anchorEl);
    // const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');
        navigate('/login')
    }

    const deactivate = async ()=>{
            const url = `http://localhost:5000/faculty/dltindfaculty/${thisfaculty._id}`
          
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                }
            });
            const json = await response.json()
            console.log(json)
            localStorage.removeItem('token');
            localStorage.removeItem('usertype');
            navigate('/login')
    }

    return (
        <AppBar sx={{          // AppBar top wala jis mein search wagera arhy
            position: "static",     // so it doesnt move
            background: "none",
            boxShadow: "none",
        }}>
            <Toolbar>

                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton onClick={() => { setIsSidebarOpen(!isSidebarOpen) }}>
                        <MenuIcon />
                    </IconButton>

                    <FlexBetween backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="1rem"
                        p="0.1rem 1.3rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                


                {/* RIGHT SIDE */}
                <FlexBetween>
                    <IconButton onClick={() => dispatch(setMode())}>    {/* switch from dark to light mode */}
                        {theme.palette.mode === "light" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />

                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>

                    <FlexBetween>
                    <a className="btn mx-1" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><button className="dropdown-item" onClick={handleClose}>Logout</button></li>
                        <li><button className="dropdown-item" onClick={deactivate}>Deactivate Account</button></li>
                    </ul>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar