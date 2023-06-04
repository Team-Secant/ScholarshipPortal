import React,{useContext, useState,useRef} from 'react'
import Box from '@mui/material/Box';
import { appereancecontext } from '../context/Appereancestate';
import { studentcontext } from '../context/StudentState';
import Addprofilebox from './Addprofilebox';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';


const UploadDoc = () => {

    const {bgcolor,color} = useContext(appereancecontext)
    const {thisStudent,updateStDocs,dltStDocs} = useContext(studentcontext)

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);
    const ref8 = useRef(null);
    const ref9 = useRef(null);

    const [images,setimages] = useState({"stimg":"none","stsscms":"none","sthscms":"none","stunicard":"none","depcnic":"none","unims":"none","ssccert":"none","depsalaryimg":"none","billimg1":"none","billimg2":"none"})
    const docsid = {"stimg":thisStudent.stimgpid,"stsscms":thisStudent.stsscmspid,"sthscms":thisStudent.sthscmspid,"stunicard":thisStudent.stunicardpid,"depcnic":thisStudent.depcnicpid,"unims":thisStudent.unimspid,"ssccert":thisStudent.ssccertpid,"depsalaryimg":thisStudent.depsalaryimgpid,"billimg1":thisStudent.billimg1pid,"billimg2":thisStudent.billimg2pid}

    // useEffect(()=>{
    //     console.log(docsid)
    // },[])

    const resetfile = (name,myref)=>{
        myref.current.value = "";
        setimages({...images, [name]:"none"})
    }

    const filehandler = (event)=>{
        var fileName = event.target.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile==="jpg" || extFile==="jpeg" || extFile==="png"){
            //TO DO
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                setimages({...images, [event.target.name]:reader.result})
            })

        }else{
            alert("Only jpg/jpeg and png files are allowed!");
        }   
        console.log(images)
    }
    
    const submithandler = (e)=>{
        e.preventDefault();
        const filteredImages = Object.entries(images).reduce((acc, [key, value]) => {
            if (value !== "none") {
              acc[key] = value;
            }
            return acc;
          }, {});
          console.log(filteredImages)

        const filteredids =  Object.entries(filteredImages).reduce((acc, [key, value]) => {
            if (value !== "none") {
              acc[key+"pid"] = docsid[key];
            }
            return acc;
          }, {}); 
        console.log(filteredids)
        console.log(filteredImages)

        dltStDocs(filteredids)
        updateStDocs(filteredImages)
    }


  return (
    <>
    <h3 className='text-center mx-2 mt-2'><span className="badge" style={{backgroundColor:bgcolor,color:color,boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>Upload Documents</span></h3>
    <form onSubmit={submithandler} className="container d-flex justify-content-center align-items-center flex-column"> 
        <div className="row d-flex justify-content-center align-items-start" style={{height:"68vh", overflow:"scroll"}}>

            <Addprofilebox images={images}  setimages={setimages}/>

            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-column">

                <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">SSC Marksheet:</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref1} accept="image/*" type="file" className="form-control mx-1" aria-label="stsscms" name="stsscms" aria-describedby="basic-addon1"  onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.stsscms === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("stsscms",ref1)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>
                <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">HSC Marksheet:</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref2} accept="image/*" type="file" className="form-control mx-1" aria-label="sthscms" name="sthscms" aria-describedby="basic-addon1" onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.sthscms === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("sthscms",ref2)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>
                <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">Dependant's CNIC(front and back):</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref3} accept="image/*" type="file" className="form-control mx-1" aria-label="depcnic" name="depcnic" aria-describedby="basic-addon1"  onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.depcnic === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("depcnic",ref3)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>  
                {(thisStudent.sttype === "Need-Based" || thisStudent.sttype === "Both") && <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">Father's Salary Slip:</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref4} accept="image/*" type="file" className="form-control mx-1" aria-label="depsalaryimg" name="depsalaryimg" aria-describedby="basic-addon1" onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.depsalaryimg === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("depsalaryimg",ref4)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>}  

                {(thisStudent.sttype === "Need-Based" || thisStudent.sttype === "Both") && <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">Electricity Bill 1(Recent):</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref5} accept="image/*" type="file" className="form-control mx-1" aria-label="billimg1" name="billimg1" aria-describedby="basic-addon1" onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.billimg1 === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("billimg1",ref5)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>}  
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-column">

                <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">University ID Card:</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref6} accept="image/*" type="file" className="form-control mx-1" aria-label="stunicard" name="stunicard" aria-describedby="basic-addon1" onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.stunicard === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("stunicard",ref6)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>
                <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">SSC Certificate:</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref7} accept="image/*" type="file" className="form-control mx-1" aria-label="ssccert" name="ssccert" aria-describedby="basic-addon1" onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.ssccert === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("ssccert",ref7)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>
                <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">Academic Transcript:</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref8} accept="image/*" type="file" className="form-control mx-1" aria-label="unims" name="unims" aria-describedby="basic-addon1" onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.unims === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("unims",ref8)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>  
                {(thisStudent.sttype === "Need-Based" || thisStudent.sttype === "Both") && <Box component="main" sx={{ flexGrow: 1,m:1}} className='container d-flex flex-column'>
                    <label className='my-2' htmlFor="sscms">Electricity Bill 2(Recent):</label>
                    <div className="input-group" style={{border:"0px solid #041B36",borderRadius:"0px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center"}}>
                        <input style={{backgroundColor:"transparent",border:"0px"}} ref={ref9} accept="image/*" type="file" className="form-control mx-1" aria-label="billimg2" name="billimg2" aria-describedby="basic-addon1" onChange={filehandler}/>
                        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><button className='btn' disabled={images.billimg2 === "none"} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={()=>resetfile("billimg2",ref9)}><i className="bi bi-x-circle-fill fs-5" style={{color:"green",cursor:"pointer"}}></i></button></span>
                    </div>
                </Box>}  
            </div>
        </div>
            <button type='submit' className="btn btn-success w-25 mt-2">Save</button>
    </form>
      
    </>
  )
}

export default UploadDoc
