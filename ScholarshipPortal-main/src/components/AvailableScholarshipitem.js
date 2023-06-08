import React, { useContext, useState } from 'react'
import { studentcontext } from '../context/StudentState'

const AvailableScholarshipitem = ({item,index,handlemodaldetails,filtervalue,notallowed,appliedlenght}) => {

  const [hover,sethover] = useState(false)
  const {thisStudent} = useContext(studentcontext)

  return (
    <>
    {(item.active&&filtervalue==="1")&&<tr>
        <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td>{item.name}</td>
        <td><span className="badge" style={{backgroundColor:item.active?"#A8FFC2":"#FFD6D6",color:item.active?"green":"#E80000",border:"1px solid",borderColor:item.active?"green":"#E80000",borderRadius:"30px"}}>{item.active?"Yes":"No"}</span></td>
        <td><span className="badge" style={{backgroundColor:thisStudent.stcgpa>=item.mincgpa?"#A8FFC2":"#FFD6D6",color:thisStudent.stcgpa>=item.mincgpa?"green":"#E80000",border:"1px solid",borderColor:thisStudent.stcgpa>=item.mincgpa?"green":"#E80000",borderRadius:"30px"}}>{thisStudent.stcgpa>=item.mincgpa?"Yes":"No"}</span></td>
        <td>{item.minincome}</td>
        <td>{item.mincgpa}</td>
        <td>{item.award}</td>
        <td>{item.lastdate.slice(0,10)}</td>
        <td><button className="btn btn-sm" disabled={thisStudent.stcgpa<=item.mincgpa || notallowed || appliedlenght.length>0} style={{border:"0px"}}  onClick={()=>handlemodaldetails(item)} onMouseOver={()=>sethover(true)} onMouseOut={()=>sethover(false)}><i className={`bi ${hover?"bi-arrow-right-circle-fill":"bi-arrow-right-circle"} fs-5`} id='bi'></i></button></td>
    </tr>}
    {(filtervalue==="0")&&<tr>
    <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td>{item.name}</td>
        <td><span className="badge" style={{backgroundColor:item.active?"#A8FFC2":"#FFD6D6",color:item.active?"green":"#E80000",border:"1px solid",borderColor:item.active?"green":"#E80000",borderRadius:"30px"}}>{item.active?"Yes":"No"}</span></td>
        <td><span className="badge" style={{backgroundColor:thisStudent.stcgpa>=item.mincgpa?"#A8FFC2":"#FFD6D6",color:thisStudent.stcgpa>=item.mincgpa?"green":"#E80000",border:"1px solid",borderColor:thisStudent.stcgpa>=item.mincgpa?"green":"#E80000",borderRadius:"30px"}}>{thisStudent.stcgpa>=item.mincgpa?"Yes":"No"}</span></td>
        <td>{item.minincome}</td>
        <td>{item.mincgpa}</td>
        <td>{item.award}</td>
        <td>{item.lastdate.slice(0,10)}</td>
        <td><button className="btn btn-sm" disabled={!item.active || thisStudent.stcgpa<item.mincgpa || notallowed || appliedlenght.length>0} style={{border:"0px"}} onClick={()=>handlemodaldetails(item)} onMouseOver={()=>sethover(true)} onMouseOut={()=>sethover(false)}><i className={`bi ${hover?"bi-arrow-right-circle-fill":"bi-arrow-right-circle"} fs-5`} id='bi'></i></button></td>
    </tr>}
    </>
  )
}

export default AvailableScholarshipitem
