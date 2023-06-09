import './App.css';
import SideNav from './components/SideNav';
import Signup from './components/Signup';
import Login from './components/Login';

import React, { useMemo } from 'react'
import { ThemeProvider,CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme"     // we created
import { useSelector } from 'react-redux';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Appereancestate from './context/Appereancestate';
import Countries from './context/Countries';
import StudentState from './context/StudentState';

import Announcement from './components/Announcement';
import AvailableScholarship from './components/AvailableScholarship';
import AppliedScholarship from './components/AppliedScholarship';
import Settings from './components/Settings';
import Home from './components/Home';

import Layout from "./scenes/layout";
import AdminHome from "./scenes/Home"
import Students from "./scenes/students";
import Scholarshipsss from "./scenes/scholarshipss"
import ScholarShipAll from "./scenes/scholarship/AllScholarships"
import ScholarShipAdd from "./scenes/scholarship/AddScholarship"
import ScholarShipEdit from "./scenes/scholarship/EditScholarship"

import PendingSc from "./scenes/ScApproval/PendingSc"

import AddAnnoucement from "./scenes/Annoucement/AddAnnoucement"
import AllAnnoucement from "./scenes/Annoucement/AllAnnoucement"
import EditAnnoucement from "./scenes/Annoucement/EditAnnoucement"
import AnnouncementState from './context/AnnouncementState';
import ScholarshipState from './context/Scholarshipstate';
import ApplicationState from './context/ApplicationState';
import PageNotExist from './components/PageNotExist';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Emailverification from './components/Emailverification';
import EmailVerificationFaculty from './components/EmailVerificationFaculty';

function App() {

  const mode = useSelector((state) => state.global.mode)

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <>
    <ToastContainer position="bottom-right" autoClose={5000} pauseOnHover theme="light"/>
    <ApplicationState>
    <ScholarshipState>
    <AnnouncementState>
    <StudentState>
      <Countries>
        <Appereancestate>
          <BrowserRouter>
          <ThemeProvider theme={theme}>

            <CssBaseline />
            <Routes>
            {/* { !localStorage.getItem('token') && <Route path="/" element={<Navigate to="/login" replace />} />} */   } 
            { <Route path="/" element={<Navigate to="/login" replace />} />}
            { <Route path="/*" element={<PageNotExist/>} />}
            { <Route path="/student/email-verification/:id" element={<Emailverification/>} />}
            { <Route path="/faculty/email-verification/:id" element={<EmailVerificationFaculty/>} />}

              {/* {thisStudent?.usertype === "student" && <Route path="/" element={<Navigate to="/studentdashboard/home" replace />} />} */}
              <Route path="/studentdashboard/" element={<SideNav/>}>
                  <Route path="/studentdashboard/home" element={<Home/>} />
                  <Route path="/studentdashboard/availableScholarship" element={<AvailableScholarship/>} />
                  <Route path="/studentdashboard/appliedScholarship" element={<AppliedScholarship/>} />
                  <Route path="/studentdashboard/announcement" element={<Announcement/>} />
                  <Route path="/studentdashboard/settings" element={<Settings/>}/>
              </Route> 

                {/* {((thisStudent?.usertype === "faculty" || thisStudent?.usertype === "alumni" || thisStudent?.usertype === "op") && Object.keys(thisStudent).length !== 0) && <Route path="/" element={<Navigate to="/admindashboard/home" replace />} />} */}
              <Route path="/admindashboard/" element={<Layout />}>

                <Route path="/admindashboard/home" element={<AdminHome />} />
                <Route path="/admindashboard/students" element={<Students />} />
                <Route path="/admindashboard/applications" element={<Scholarshipsss />} />
                
                <Route path="/admindashboard/scholarship" element={<ScholarShipAll />} />
                <Route path="/admindashboard/scholarship/add" element={<ScholarShipAdd />} />
                <Route path="/admindashboard/scholarship/edit/:id" element={<ScholarShipEdit />} />

                <Route path="/admindashboard/announcement" element={<AllAnnoucement />} />
                <Route path="/admindashboard/announcement/add" element={<AddAnnoucement />} />
                <Route path="/admindashboard/announcement/edit/:id" element={<EditAnnoucement />} />

                <Route path="/admindashboard/requests"  element={<PendingSc/>}/>
            </Route>

              <Route path="/signup" element={<Signup/>}/>         
              <Route path="/login" element={<Login/>}/>                
            </Routes>
            </ThemeProvider>
          </BrowserRouter>  
        </Appereancestate>
      </Countries>
    </StudentState>
    </AnnouncementState>
    </ScholarshipState>
    </ApplicationState>
    </>
  );
}

export default App;
