import React, { useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import '../App.css';
import Box from '@mui/material/Box';
import {
    Link
} from "react-router-dom";
import { appereancecontext } from '../context/Appereancestate';
import { studentcontext } from '../context/StudentState';
import { applicationcontext } from '../context/ApplicationState';
import { scholarshipcontext } from '../context/Scholarshipstate';
import { announcementcontext } from '../context/AnnouncementState';
import Announceline from './Announceline';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const Home = () => {


    const { color, bgcolor } = useContext(appereancecontext)
    const { thisStudent } = useContext(studentcontext)
    const { allapplication, fetchallapplication } = useContext(applicationcontext)
    const { allscholarship, fetchallscholarship } = useContext(scholarshipcontext)
    const { fetchallannounce, allannounce } = useContext(announcementcontext);


    useEffect(() => {
        fetchallapplication();
        fetchallscholarship();
        fetchallannounce();
    }, [])

    const myappliedsc = allapplication.filter((item) => { return item.stid === thisStudent._id })
    const activesc = allscholarship.filter((item) => { return item.active === true })

    let announceline = "";

    allannounce.map((element) => {
        return announceline = announceline + element.description.slice(0, 120) + "..." + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0|\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
    })

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader style={{ backgroundColor: bgcolor }} />
                <div style={{ height: "300px", backgroundColor: bgcolor }}>
                    <Box component="main" sx={{ flexGrow: 1, px: 5, py: 2 }}>
                        <div className="card" style={{ color: color, background: 'rgba(255, 255, 255, 0.3)', borderRadius: '16px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '0px solid rgba(255, 255, 255, 0.3)' }}>
                            <div className="card-body d-flex justify-content-start align-items-center flex-row">
                                <img className='mx-3' src={require('../asset/icons8-commercial.gif')} alt="" height="50px" />
                                <div className='d-flex justify-content-center align-items-center flex-row' style={{ flex: 2 }}>
                                    <h5 className="fs-4 mx-2"><span className="badge bg-success">Announcement</span></h5>
                                    {/* <marquee behavior="" direction="" width="600rem"><p className="card-text">No Announcement found</p></marquee> */}
                                    {/* <p className="card-text mx-3">No Announcement found</p> */}
                                    <Announceline announceline={announceline} />
                                </div>
                                {/* <Box sx={{ flexGrow: 1}}/> */}
                                <span className="container d-flex justify-content-end" /*style={{flex:1}}*/ style={{ flex: "0 11%" }} >
                                    <Link className="btn btn-light btn-sm" to="/studentdashboard/announcement">Learn More</Link>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="card-body d-flex justify-content-start align-items-center flex-column flex-lg-row my-4 mx-5" style={{ color: color }}>
                                <div className='d-flex justify-content-start align-items-center align-items-lg-start flex-column mb-sm-2'>
                                    <h5 className="fs-4">Welcome {thisStudent.fname}!</h5>
                                    <p className="card-text">Welcome to NEDUET Scholarship Portal</p>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                                <div className='d-flex justify-content-center align-items-center flex-row'>
                                    <div className='d-flex justify-content-start align-items-center flex-row mx-3'>
                                        <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/45/null/external-calendar-education-kmg-design-flat-kmg-design.png" alt="" />
                                        <p className="fs-6 fs-lg-5 card-text mx-2 fw-bold">{thisStudent.stsem}</p>
                                    </div>
                                    <div className='d-flex justify-content-start align-items-center flex-row mx-3'>
                                        <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/45/null/external-department-university-flaticons-flat-flat-icons-2.png" alt="" />
                                        <p className="fs-6 card-text mx-2 fw-bold">{thisStudent.stdepart}</p>
                                    </div>
                                    <div className='d-flex justify-content-start align-items-center flex-row mx-3'>
                                        <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/45/null/external-year-morning-flaticons-flat-flat-icons.png" alt="" />
                                        <p className="fs-6 card-text mx-2 fw-bold">{thisStudent.stbatch}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="container d-flex justify-content-center align-items-center flex-row" style={{overflowX:"scroll"}}>
                    <div className="card mx-4" style={{width: "15rem"}}>
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card mx-4" style={{width: "15rem"}}>
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card mx-4" style={{width: "15rem"}}>
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card mx-4" style={{width: "15rem"}}>
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div> */}
                        <div className="d-lg-flex d-none justify-content-center align-items-center">
                            <div className="row d-flex justify-content-center align-items-center gx-5">
                                <div className="col-md-6 col-lg-3 gy-3">
                                    <div className="card" style={{ width: "15rem", height: "10rem", borderRadius: "20px", borderBottom: "4px solid #ff9a00", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                            <h6 className='text-center' style={{ zIndex: "100", cursor: "default" }}>CGPA</h6>
                                            <div className="circle-wrap" style={{ zIndex: "100" }}>
                                                <div className="circle">
                                                    <div className="mask half">
                                                        <div className="fill"></div>
                                                    </div>
                                                    <div className="mask full">
                                                        <div className="fill"></div>
                                                    </div>
                                                    <div className="inside-circle">{thisStudent.stcgpa}</div>
                                                </div>
                                            </div>
                                            <p className='text-center p-1' style={{ zIndex: "100", cursor: "default" }}>
                                                {thisStudent.stcgpa >= '3.5' && "You're doing great!"}
                                                {(thisStudent.stcgpa >= '3' && thisStudent.stcgpa < '3.5') && "Keep it up!"}
                                                {(thisStudent.stcgpa >= '2' && thisStudent.stcgpa < '3') && "Keep Improving!"}
                                            </p>
                                        </div>
                                        <div className="water1"></div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 gy-3">
                                    <div className="card" style={{ width: "15rem", height: "10rem", borderRadius: "20px", borderBottom: "4px solid #eeca2e", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                            <h6 className='text-center txt' style={{ zIndex: "100", cursor: "default" }}>Applied Scholarship</h6>
                                            <h1 className='fs-1 text-center txt' style={{ zIndex: "100", cursor: "default" }}>{myappliedsc.length}</h1>
                                        </div>
                                        <div className="water2"></div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 gy-3">
                                    <div className="card" style={{ width: "15rem", height: "10rem", borderRadius: "20px", borderBottom: "4px solid #0e9edb", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                            <h6 className='text-center txt' style={{ zIndex: "100", cursor: "default" }}>Available Scholarship</h6>
                                            <h1 className='fs-1 text-center txt' style={{ zIndex: "100", cursor: "default" }}>{activesc.length}</h1>
                                        </div>
                                        <div className="water3"></div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 gy-3">
                                    <div className="card cardh" style={{ width: "15rem", height: "10rem", borderRadius: "20px", borderBottom: "4px solid #82b453", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                            <h6 className='text-center txt' style={{ zIndex: "100", cursor: "default" }}>Scholarship type</h6>
                                            <h1 className='fs-3 text-center' style={{ zIndex: "100", cursor: "default" }}><span className="badge bg-success">{thisStudent.sttype}</span></h1>
                                        </div>
                                        <div className="water4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
                <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                    <DrawerHeader />
                    <div className='mx-5 my-4'>
                        <h4 className='text-bold'>Eligibility Criteria</h4>
                        <p>The eligibility criteria for the NED University scholarship program may vary depending on the specific scholarship being offered. However, some general eligibility criteria for the scholarships offered by NED University are:</p>
                        <ol>
                            <li>Applicants must have a strong academic record, with a minimum GPA of 2.5 or equivalent</li>
                            <li>Applicants must have been admitted to NED University in a degree program for which the scholarship is being offered.</li>
                            <li>Applicants must demonstrate financial need.</li>
                            <li>Applicants must be permanent residents of Pakistan.</li>
                            <li>Scholarships may be offered for specific fields of study or programs, and applicants must meet the eligibility criteria for those fields/programs.</li>
                            <li>Some scholarships may have specific criteria such as merit, leadership potential, community service, or research interest.</li>
                        </ol>
                        <p>It is important to note that the specific eligibility criteria for each scholarship may differ, and applicants are advised to check the requirements for the scholarship they are interested in before applying.</p>
                    </div>

                </Box>
            </Box>

        </>
    )
}

export default Home
