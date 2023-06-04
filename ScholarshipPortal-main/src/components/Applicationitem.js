import React, { useContext, useEffect, useState } from 'react'
import { scholarshipcontext } from '../context/Scholarshipstate'
import { applicationcontext } from '../context/ApplicationState'

const Applicationitem = ({item,index,withdrawsc}) => {

  const {fetchonescholarship} = useContext(scholarshipcontext)
    const [myscholarship,setmyscholarship] = useState({})

    const fetchmyscholarship = async ()=>{
        const onescholarship = await fetchonescholarship(item.scid)
        setmyscholarship(onescholarship)
    }

    useEffect(()=>{
        fetchmyscholarship();
    },[])

    // const withdrawsc = ()=>{
    //   dltapplication(item._id);
    //   fetchallapplication();
    // }


  return (
    <>
    {<tr>
        <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td>{myscholarship.name}</td>
        <td><span className="badge p-2 px-3" style={{fontSize:"0.7rem",backgroundColor:item.status==="Approved"?"#A8FFC2":item.status==="Pending"?"#FFF68E":"#FFD6D6",color:item.status==="Approved"?"green":item.status==="Pending"?"#CEB900":"#E80000",border:"1px solid",borderColor:item.status==="Approved"?"green":item.status==="Pending"?"#CEB900":"#E80000",borderRadius:"30px"}}>{item.status}</span></td>
        <td><button className="btn btn-outline-danger btn-sm float-end" style={{borderRadius:"20px"}} onClick={()=>{withdrawsc(item._id)}}>withdraw</button></td>
        {/* <div className='container d-flex justify-content-center'>
        </div> */}
    </tr>}
    {/* {(filtervalue==="0")&&<tr>
    <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td>{myscholarship.status==="approved"}</td>
        <td><span className="badge" style={{backgroundColor:myscholarship.status==="approved"?"#A8FFC2":"#FFD6D6",color:myscholarship.status==="approved"?"green":"#E80000",border:"1px solid",borderColor:myscholarship.status==="approved"?"green":"#E80000",borderRadius:"30px"}}>{myscholarship.status==="approved"?"Yes":"No"}</span></td>
        <td><span className="badge" style={{backgroundColor:thisStudent.stcgpa>=item.mincgpa?"#A8FFC2":"#FFD6D6",color:thisStudent.stcgpa>=item.mincgpa?"green":"#E80000",border:"1px solid",borderColor:thisStudent.stcgpa>=item.mincgpa?"green":"#E80000",borderRadius:"30px"}}>{thisStudent.stcgpa>=item.mincgpa?"Yes":"No"}</span></td>
        <td>{item.minincome}</td>
        <td>{item.mincgpa}</td>
        <td>{item.award}</td>
        <td>{item.lastdate.slice(0,10)}</td>
        <td><button className="btn btn-sm" disabled={!myscholarship.status==="approved" || thisStudent.stcgpa<=item.mincgpa} style={{border:"0px"}} onClick={()=>handlemodaldetails(item)} onMouseOver={()=>sethover(true)} onMouseOut={()=>sethover(false)}><i className={`bi ${hover?"bi-arrow-right-circle-fill":"bi-arrow-right-circle"} fs-5`} id='bi'></i></button></td>
    </tr>} */}
      
    </>
  )
}

export default Applicationitem
