import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Announcementitem from './Announcementitem';
import { appereancecontext } from '../context/Appereancestate';
import { announcementcontext } from '../context/AnnouncementState';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));


const Announcement = () => {

  const {fetchallannounce,allannounce} = useContext(announcementcontext);
  const {bgcolor,color} = useContext(appereancecontext)

  useEffect(()=>{
    fetchallannounce();
  })

  const [searchValue, setsearchValue] = useState("");
  const [filtervalue,setfiltervalue] = useState("1");

  const handlefilter = ()=>{
    let filter = document.getElementById("filter2")
    setfiltervalue(filter.value)
  }

  const handleSearch = (e)=>{
    setsearchValue(e.target.value)
  }

  
  const Announcement = allannounce.filter((element)=>{return element.title.toLowerCase().includes(searchValue.toLowerCase()) || element.description.toLowerCase().includes(searchValue.toLowerCase()) })



  return (
    <>
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader style={{backgroundColor:bgcolor}}/>
      <h3 className='text-center mx-2 mt-4'><span className="badge" style={{color:color,backgroundColor:bgcolor,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>Announcement</span></h3>
      <Box component="main" sx={{ flexGrow: 1,px:5}} className='container d-flex flex-row'>
        <div className="input-group mx-2 mt-4" style={{borderRadius:"20px"}}>
          <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><i className="bi bi-search"></i></span>
          <input style={{backgroundColor:"transparent",border:"0px"}} type="text" className="form-control" placeholder="Search" value={searchValue} onChange={handleSearch} aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mx-2 mt-4 w-25" style={{borderRadius:"20px"}}>
          <select className="form-select form-select-sm mx-2" id="filter2" onChange={handlefilter} aria-label=".form-select-sm example" style={{backgroundColor:"transparent",border:"0px"}}>
            <option value="1">Newest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </Box>
      {filtervalue==="1"&&Announcement.reverse().map((item,index)=>{
        return <div className="container" key={index}>
          <Announcementitem item={item} index={index} filtervalue={filtervalue}/>
        </div>
      })}
      {filtervalue==="2"&&Announcement.map((item,index)=>{
        return <div className="container" key={index}>
          <Announcementitem item={item} index={index} filtervalue={filtervalue}/>
        </div>
      })}
    </Box>
    </>
  )
}

export default Announcement
