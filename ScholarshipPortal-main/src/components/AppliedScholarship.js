import React, { useContext, useEffect } from 'react'
// import ScDetailsModal from './ScDetailsModal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import AvailableScholarshipitem from './AvailableScholarshipitem';
import { appereancecontext } from '../context/Appereancestate';
import Applicationitem from './Applicationitem';
// import { scholarshipcontext } from '../context/Scholarshipstate';
import { applicationcontext } from '../context/ApplicationState';
import { studentcontext } from '../context/StudentState';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const AppliedScholarship = () => {

  // const [scitem,setscitem] = useState({});
  const {bgcolor,color} = useContext(appereancecontext)
  const {thisStudent} = useContext(studentcontext)

  const {fetchallapplication,allapplication,dltapplication} = useContext(applicationcontext)
  // const [filtervalue,setfiltervalue] = useState("0");
  // const [searchValue, setsearchValue] = useState("");

  // const myref = useRef(null);

  const withdrawsc = (id)=>{
    dltapplication(id);
    fetchallapplication();
  }

  const fetchallapp = ()=>{
    fetchallapplication();
  }

  useEffect(()=>{
    fetchallapp();
  },[])

  const myappliedsc = allapplication.filter((item)=>{return item.stid === thisStudent._id})


  // const filteredScholarships = allapplication.filter(element => {return element.name.toLowerCase().includes(searchValue.toLowerCase())})

  // const handlemodaldetails = (eachscitem)=>{
  //   setscitem(eachscitem)
  //   myref.current.click();
  // }

  // const handlefilter = ()=>{
  //   let filter = document.getElementById("filter1")
  //   setfiltervalue(filter.value)
  // }

  // const handleSearch = (e)=>{
  //   setsearchValue(e.target.value)
  // }



  return (
    <>
    <Box component="main" sx={{ flexGrow: 1}} className='px-2'>
      <DrawerHeader style={{backgroundColor:bgcolor,padding:"0px"}}/>
      <h3 className='text-center mx-2 mt-4'><span className="badge" style={{color:color,backgroundColor:bgcolor,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>Applied Scholarship</span></h3>
      {myappliedsc.length>0?<div className="container px-0 my-5" style={{borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",height:"400px",overflowY:"scroll"}}>
        <table className="table">
          <thead className="table-light" style={{color:"#888989",position:"sticky",zIndex:"1",top:"0"}}>
            <tr>
              <th scope="col" style={{textAlign:"center"}}>Sr No.</th>
              <th scope="col">Scholarship Name</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {myappliedsc.map((item,index)=>{
              return <Applicationitem item={item} index={index} key={index} withdrawsc={withdrawsc}/>
            })}
          </tbody>
        </table>
        {/* <button className="btn" data-bs-toggle="modal" data-bs-target="#Scmodal" ref={myref} style={{visibility:"hidden"}}></button>
        {<ScDetailsModal item={scitem}/>} */}
      </div>:
      <>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <img className='img-fluid' src={require('../asset/searchimage.png')} alt="" width="400px"/>
        <h5 className='fs-5 text-center'>No Applied Scholarship</h5>
      </div>
      </>
      }
    </Box>
    </>
  )
}

export default AppliedScholarship
