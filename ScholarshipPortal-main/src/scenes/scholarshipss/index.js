import React, { useContext, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "state/api";
import Header from "../../components/Header";
import { applicationcontext } from "../../context/ApplicationState";
import Applicationitem from "./Applicationitem";
import StInfoModal from "../students/StInfoModal";
import ConfirmationModal from './ConfirmationModal'
// import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
    const theme = useTheme();
    const {fetchallapplication,allapplication} = useContext(applicationcontext)
    // const [filtervalue,setfiltervalue] = useState("0");
    // const [searchValue, setsearchValue] = useState("");
    const [data, setdata] = useState({});
    const [status,setstatus] = useState('');
    const [appid,setappid] = useState('');
    // const [searchValue, setsearchValue] = useState("");
    
    // const myref = useRef(null);
    const fetchallapp = ()=>{
        fetchallapplication();
    }
    
    useEffect(()=>{
        fetchallapp();
    },[])

    const changestatus = (status,id)=>{
        setstatus(status); 
        setappid(id);
    }
    
    // const filteredapplication = allapplication.filter(element => {return element.fname.toLowerCase().includes(searchValue.toLowerCase()) || element.lname.toLowerCase().includes(searchValue.toLowerCase()) || element.cnic.includes(searchValue)})
    // const handleSearch = (e)=>{
    //     setsearchValue(e.target.value)
    //   }

    return (
        <>
        <Box m="1.5rem 2.5rem">
            <Header title="APPLICATIONS" subtitle="Entire list of applications Student have submitted" />
            {/* <div class="input-group mx-2 my-4" style={{borderRadius:"20px"}}>
                <span class="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><i class="bi bi-search"></i></span>
                <input style={{backgroundColor:"transparent",border:"0px"}} type="text" value={searchValue} onChange={handleSearch} class="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
            </div> */}
            <ConfirmationModal status={status} id={appid}/>
            <StInfoModal data={data}/>
            <div className="container px-0 my-5" style={{borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",height:"400px",overflowY:"scroll"}}>
                <table className="table">
                <thead className="" style={{backgroundColor:theme.palette.secondary[50],color:"white",position:"sticky",zIndex:"1",top:"0"}}>
                    <tr>
                    <th scope="col" style={{textAlign:"center"}}>Sr No.</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student Roll No.</th>
                    <th scope="col">Scholarship Name</th>
                    <th scope="col">Apply Date</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {allapplication.map((item,index)=>{
                        return <Applicationitem item={item} index={index} key={index} setdata={setdata} changestatus={changestatus} setstatus={setstatus}/>
                    })
                }

                </tbody>
                </table>
            </div>
        </Box>
        </>
    )
}

export default Transactions