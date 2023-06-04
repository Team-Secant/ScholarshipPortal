import React, { useContext } from 'react'
import { appereancecontext } from '../context/Appereancestate'


const Appereance = () => {

  const {bgcolor,setbgcolor,setcolor,color} = useContext(appereancecontext); 

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center flex-column" style={{}}>

        <h3 className='mx-3 my-3'><span className="badge" style={{backgroundColor:bgcolor,color:color,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>Select theme</span></h3>
        <div className="container d-flex justify-content-center align-items-center flex-column flex-md-row">
            
            <button className='my-3 d-flex justify-content-center mx-2' onClick={()=>{setbgcolor("#0F8A90"); setcolor("white")}} style={{width:"50px", height:"50px", backgroundColor:"#0F8A90",position:"relative",border:bgcolor==="#0F8A90"?"4px solid lightgreen":"0px solid black", borderRadius:"15px", boxShadow: bgcolor==="#306754"&&"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
                <div className='mt-1' style={{width:"35px", height:"10px", backgroundColor:"white",position:"absolute", borderRadius:"10px"}}></div>
            </button>

            <button className='my-3 d-flex justify-content-center mx-2' onClick={()=>{setbgcolor("#041B36"); setcolor("white");}} style={{width:"50px", height:"50px", backgroundColor:"#041B36",position:"relative",border:bgcolor==="#041B36"?"4px solid lightgreen":"0px solid black", borderRadius:"15px", boxShadow: bgcolor==="#041B36"&&"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
                <div className='mt-1' style={{width:"35px", height:"10px", backgroundColor:"white",position:"absolute", borderRadius:"10px"}}></div>
            </button>

            <button className='my-3 d-flex justify-content-center mx-2' onClick={()=>{setbgcolor("#f4bc6d"); setcolor("white")}} style={{width:"50px", height:"50px", backgroundColor:"#f4bc6d",position:"relative",border:bgcolor==="#f4bc6d"?"4px solid lightgreen":"0px solid black", borderRadius:"15px", boxShadow: bgcolor==="#f4bc6d"&&"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
                <div className='mt-1' style={{width:"35px", height:"10px", backgroundColor:"white",position:"absolute", borderRadius:"10px"}}></div>
            </button>

            <button className='my-3 d-flex justify-content-center mx-2' onClick={()=>{setbgcolor("#d2544a"); setcolor("white")}} style={{width:"50px", height:"50px", backgroundColor:"#d2544a",position:"relative",border:bgcolor==="#d2544a"?"4px solid lightgreen":"0px solid black", borderRadius:"15px", boxShadow: bgcolor==="#d2544a"&&"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
                <div className='mt-1' style={{width:"35px", height:"10px", backgroundColor:"white",position:"absolute", borderRadius:"10px"}}></div>
            </button>

            <button className='input-group my-3 d-flex justify-content-center mx-2' onClick={()=>{setbgcolor("#292C33"); setcolor("white")}} style={{width:"50px", height:"50px", backgroundColor:"#292C33",position:"relative",border:bgcolor==="#292C33"?"4px solid lightgreen":"0px solid black", borderRadius:"15px", boxShadow: bgcolor==="#292C33"&&"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
                <div className='mt-1' style={{width:"35px", height:"10px", backgroundColor:"white",position:"absolute", borderRadius:"10px"}}></div>
            </button>

            <button className='my-3 d-flex justify-content-center mx-2' onClick={()=>{setbgcolor("#57b5b6"); setcolor("white")}} style={{width:"50px", height:"50px", backgroundColor:"#57b5b6",position:"relative",border:bgcolor==="#57b5b6"?"4px solid lightgreen":"0px solid black", borderRadius:"15px", boxShadow:bgcolor==="#57b5b6"&&"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
                <div className='mt-1' style={{width:"35px", height:"10px", backgroundColor:"white",position:"absolute", borderRadius:"10px"}}></div>
            </button>
        </div>
        
    </div> 
    </>
  )
}

export default Appereance
