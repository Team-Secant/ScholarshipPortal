import React, { useContext, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "state/api";
import Header from "../../components/Header";
import { applicationcontext } from "../../context/ApplicationState";
import Applicationitem from "./Applicationitem";
// import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
    const theme = useTheme();
    const {fetchallapplication,allapplication} = useContext(applicationcontext)
    // const [filtervalue,setfiltervalue] = useState("0");
    // const [searchValue, setsearchValue] = useState("");
  
    // const myref = useRef(null);
    const fetchallapp = ()=>{
      fetchallapplication();
    }
  
    useEffect(()=>{
      fetchallapp();
    },[])

    return (
        <>
        <Box m="1.5rem 2.5rem">
            <Header title="APPLICATIONS" subtitle="Entire list of applications Student have submitted" />

            <div className="container px-0 my-5" style={{borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",height:"400px",overflowY:"scroll"}}>
                <table className="table">
                <thead className="table-light" style={{color:"#888989",position:"sticky",zIndex:"1",top:"0"}}>
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
                        return <Applicationitem item={item} index={index} key={index}/>
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