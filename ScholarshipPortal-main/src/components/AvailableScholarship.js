import React, { useState,useRef, useContext, useEffect } from 'react'
import ScDetailsModal from './ScDetailsModal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AvailableScholarshipitem from './AvailableScholarshipitem';
import { appereancecontext } from '../context/Appereancestate';
import { scholarshipcontext } from '../context/Scholarshipstate';
import { applicationcontext } from '../context/ApplicationState';
import { studentcontext } from '../context/StudentState';
import { Alert } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const AvailableScholarship = () => {

  const {fetchallscholarship,allscholarship} = useContext(scholarshipcontext)
  const {fetchallapplication,allapplication} = useContext(applicationcontext)
            
  const {thisStudent,notallowed,checkinfofilled} = useContext(studentcontext)

  const [scitem,setscitem] = useState({});
  const [filtervalue,setfiltervalue] = useState("0");
  const [searchValue, setsearchValue] = useState("");
  const {bgcolor,color} = useContext(appereancecontext)
  
  const myref = useRef(null);
  
  const thisstapplication = allapplication?.filter(element => {return element.stid === thisStudent._id})
  const filteredScholarships = allscholarship?.filter(element => {return element.name.toLowerCase().includes(searchValue.toLowerCase())})

  const handlemodaldetails = (eachscitem)=>{
    fetchallapplication();
    setscitem(eachscitem)
    myref.current.click();
    console.log(filtervalue)
  }

  const handlefilter = ()=>{
    let filter = document.getElementById("filter1")
    setfiltervalue(filter.value)
  }

  const handleSearch = (e)=>{
    setsearchValue(e.target.value)
  }

  useEffect(()=>{
    checkinfofilled();
  },[])
  

  return (
    <>
    <Box component="main" sx={{ flexGrow: 1}} className='px-2'>
      <DrawerHeader style={{backgroundColor:bgcolor,padding:"0px"}}/>
      <h3 className='text-center mx-2 mt-4'><span className="badge" style={{color:color,backgroundColor:bgcolor,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>Available Scholarship</span></h3>

    {notallowed&&<div className="container">
            <Alert className='mt-3'  severity="error">You can not apply to Scholarships at the moment. Please fill Dependant's Information and Upload Documents first!</Alert>
      </div>}

      <Box component="main" sx={{ flexGrow: 1}} className='container d-flex flex-row my-2'>
        <div className="input-group mx-2 my-4" style={{borderRadius:"20px"}}>
          <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><i className="bi bi-search"></i></span>
          <input style={{backgroundColor:"transparent",border:"0px"}} type="text" value={searchValue} onChange={handleSearch} className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mx-2 my-4 w-25" style={{borderRadius:"20px"}}>
          <select className="form-select form-select-sm mx-2" defaultValue="0" id='filter1' onChange={handlefilter} aria-label=".form-select-sm example" style={{backgroundColor:"transparent",border:"0px"}}>
            <option value="0">All</option>
            <option value="1">Available</option>
            <option value="2">Applied</option>
          </select>
        </div>
      </Box>
      {filteredScholarships.length>0&&<div className="container px-0" style={{borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",height:"400px",overflowY:"scroll"}}>
        <table className="table">
          <thead className="table-light" style={{color:"#888989",position:"sticky",zIndex:"1",top:"0"}}>
            <tr>
              <th scope="col" style={{textAlign:"center"}}>Sr No.</th>
              <th scope="col">Scholarship</th>
              <th scope="col">Active</th>
              <th scope="col">Eligible</th>
              <th scope="col">Min income</th>
              <th scope="col">Min CGPA</th>
              <th scope="col">Award</th>
              <th scope="col">Last Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {filteredScholarships.map((item,index)=>{
              return <AvailableScholarshipitem item={item} filtervalue={filtervalue} notallowed={notallowed} handlemodaldetails={handlemodaldetails} index={index} key={index}/>
            })}
          </tbody>
        </table>
        <button className="btn" data-bs-toggle="modal" data-bs-target="#Scmodal" ref={myref} style={{visibility:"hidden"}}></button>
        {<ScDetailsModal item={scitem} thisstapplication={thisstapplication}/>}
      </div>}
      {filteredScholarships.length === 0 &&
        <>
          <div className="container d-flex justify-content-center align-items-center flex-column">
            <img className='img-fluid' src={require("../asset/searchimage.png")} alt="" width="300vw" height="auto"/>
            <h4 className='fs-4 fw-bold'>No results found. Try a different Keyword.</h4>
          </div>
        </>}
    </Box>
    </>
  )
}

export default AvailableScholarship
