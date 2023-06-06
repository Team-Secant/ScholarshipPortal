import React, { useContext, useEffect } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
    // DownloadOutlined,
    PersonAdd,
} from "@mui/icons-material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import {
    Box,
    // Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import BreakdownChart from "../../components/BreakdownChart";
// import OverviewChart from "../../components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
import StatBox from "../../components/StatBox";
import { applicationcontext } from "../../context/ApplicationState";
import { studentcontext } from "../../context/StudentState";
import { scholarshipcontext } from "../../context/Scholarshipstate";
import { announcementcontext } from "../../context/AnnouncementState";
import Announcementrow from "./Announcementrow";

const Dashboard = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const {fetchallapplication,allapplication} = useContext(applicationcontext)
    const {fetchallstudent,allst} = useContext(studentcontext)
    const {fetchallscholarship,allscholarship} = useContext(scholarshipcontext)
    const {fetchallannounce,allannounce} = useContext(announcementcontext)

    useEffect(()=>{
        fetchallapplication();
        fetchallstudent();
        fetchallscholarship();
        fetchallannounce();
    },[])

    const approvedapp = allapplication.filter((item)=>{return item.status === "Approved"})
    
    

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title={`${localStorage.getItem("usertype").toUpperCase()} DASHBOARD`} subtitle="Welcome to your dashboard" />
            </FlexBetween>


            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                {/* ROW 1 */}

                <StatBox
                    title="Total Students"
                    value={allst.length}
                    increase=""
                    description=""
                    icon={
                        <PersonIcon
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Total Scholarships"
                    value={allscholarship.length}
                    increase=""
                    description=""
                    icon={
                        <EmojiEventsIcon
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                    <StatBox
                        title="Total Applications"
                        value={allapplication.length}
                        increase=""
                        description=""
                        icon={
                            <PersonAdd
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
    
                    <StatBox
                        title="Scholarships granted"
                        value={approvedapp.length}
                        increase=""
                        description=""
                        icon={
                            <HowToRegIcon
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                {/* side wala graph */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 1"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                    style={{height:"52vh",overflowY:"scroll"}}
                >
                    <h3 className="mt-2">Ongoing Announcement</h3>
                    <table className="table mt-3">
                        <thead className="table-light" style={{color:"#888989",position:"sticky",zIndex:"1",top:"0"}}>
                            <tr>
                            <th scope="col" style={{textAlign:"center"}}>Sr No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            {/* <th scope="col"></th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {allannounce.map((item,index)=>{
                            return <Announcementrow item={item} index={index} key={index}/>
                            })}
                        </tbody>
                        </table>
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 3"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderRadius: "5rem",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.background.alt,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200]} !important`,
                        },
                    }}
                >
                </Box>

            </Box>

        </Box>

    )
}

export default Dashboard