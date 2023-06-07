import {useState,React, useContext, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CampaignIcon from '@mui/icons-material/Campaign';
// import Home from './Home';
import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import {
  Routes,
  NavLink,
  useLocation,
  useNavigate,
  Outlet
} from "react-router-dom";
import '../App.css';
// import Announcement from './Announcement';
// import AvailableScholarship from './AvailableScholarship';
// import AppliedScholarship from './AppliedScholarship';
// import Settings from './Settings';
import { appereancecontext } from '../context/Appereancestate';
import { studentcontext } from '../context/StudentState';
import { scholarshipcontext } from '../context/Scholarshipstate';
import Confirmationmodal from './Confirmationmodal';

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    // zIndex:99,
    // position:"fixed",
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const SideNav = () => {
    
        // const theme = useTheme();
        const [open, setOpen] = useState(false);
        const {bgcolor} = useContext(appereancecontext)
        const {fetchThisStudent,thisStudent} = useContext(studentcontext)
        const {fetchallscholarship} = useContext(scholarshipcontext)
        const location = useLocation();
        const navigate = useNavigate();

        const logouthandle = (e)=>{
          e.preventDefault()
          localStorage.removeItem('token')
          navigate('/login')
        }

        useEffect(()=>{
          if(!localStorage.getItem('token')){
            navigate('/login')
          }
          else{
            fetchThisStudent();
            fetchallscholarship();
          }
        },[])


        const handleDrawerOpen = () => {
            setOpen(true);
        };

        const handleDrawerClose = () => {
            setOpen(false);
        };

        const [colorChange, setColorchange] = useState(false);
        const changeNavbarColor = () =>{
          if(window.scrollY >= 20){
            setColorchange(true);
          }
          else{
            setColorchange(false);
          }
        };
        window.addEventListener('scroll', changeNavbarColor);



        return (
          <>
            <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar id='mynav' open={open} style={{backgroundColor:colorChange?"white":"transparent",color:colorChange?"black":"white",transition:"0.2s ease all", boxShadow:colorChange?"rgba(0, 0, 0, 0.24) 0px 3px 8px":"rgba(33, 35, 38, 0) 0px 10px 10px -10px"}}>
                <Toolbar>

                  <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{marginRight: 5,...(open && { display: 'none' }),}}>
                      <MenuIcon color="action"/>
                  </IconButton>

                  <Typography variant="h4" noWrap component="div" sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }} style={{fontWeight:"bolder"}}>
                      Student Dashboard
                  </Typography>
                  
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
                  </Search>

                  <Box sx={{ flexGrow: 1 }}/>
                  <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>

                    {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <Badge badgeContent={4} color="error">
                        <MailIcon />
                      </Badge>
                    </IconButton>

                    <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                      <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton> */}
                    <Confirmationmodal stid={thisStudent._id}/>
                    <div className="dropdown">
                      <button className="btn text-light dropdown-toggle mx-2 my-2" style={{border:"0px transparent"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {(thisStudent.stimg==="none" || thisStudent.stimg==="") ?<AccountCircle/>:<img style={{borderRadius:"16px"}} src={thisStudent.stimg} alt="" width="32px" height="32px"/>}
                      </button>
                      <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={logouthandle}>Logout</button></li>
                        <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#confirmdlt">Deactivate account</button></li>
                      </ul>
                    </div>
                  </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader style={{height: open? '200px':'0px'}}>
                {open&&<img className='img-fluid p-5 mx-auto' src={require('../asset/NEDLogo.png')} alt=""/>}
                <IconButton onClick={handleDrawerClose}>
                    {open && <ChevronLeftIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {['Home', 'Scholarships', 'Applied Scholarship', 'Announcements'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                      <NavLink style={{textDecoration:"none", color:"#041B36"}} to={(index===0&&"/studentdashboard/home") || (index===1&&"/studentdashboard/availableScholarship") || (index===2&&"/studentdashboard/appliedScholarship") || (index===3&&"/studentdashboard/announcement")} end>
                        <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,borderRight:((index===0 && location.pathname ==="/studentdashboard/home") && "2px solid blue") || ((index===1 && location.pathname ==="/studentdashboard/availableScholarship") && "2px solid blue") || ((index===2 && location.pathname ==="/studentdashboard/appliedScholarship") && "2px solid blue") || ((index===3 && location.pathname ==="/studentdashboard/announcement") && "2px solid blue")}}>
                          <ListItemIcon
                            sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                            {index === 0 && <HomeIcon style={{color:location.pathname === "/"?"blue":bgcolor}}/>}
                            {index === 1 && <SchoolIcon style={{color:location.pathname === "/availableScholarship"?"blue":bgcolor}}/>}
                            {index === 2 && <CheckCircleIcon style={{color:location.pathname === "/appliedScholarship"?"blue":bgcolor}}/>}
                            {index === 3 && <CampaignIcon style={{color:location.pathname === "/announcement"?"blue":bgcolor}}/>}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </NavLink>
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{height:"250px"}}/>
                <List>
                    <ListItem key="Setting" disablePadding sx={{ display: 'block' }}>
                    <NavLink style={{textDecoration:"none", color:"#041B36"}} to="/studentdashboard/settings">
                      <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,borderRight: location.pathname ==="/settings"&&"2px solid blue"}}>
                          <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                            <SettingsIcon style={{color:location.pathname === "/studentdashboard/settings"?"blue":bgcolor}}/>
                          </ListItemIcon>
                          <ListItemText primary="Setting" sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </NavLink>
                    </ListItem>
                </List>
            </Drawer>
            <Outlet/>
            <Routes>
              {/* <Route path="/" element={<Home/>} />
              <Route path="/availableScholarship" element={<AvailableScholarship/>} />
              <Route path="/appliedScholarship" element={<AppliedScholarship/>} />
              <Route path="/announcement" element={<Announcement/>} />
              <Route path="/settings" element={<Settings/>} /> */}

            </Routes>
            
        </Box>
      </>
        );
}

export default SideNav
