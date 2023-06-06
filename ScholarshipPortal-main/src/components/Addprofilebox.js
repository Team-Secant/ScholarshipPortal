import React,{useContext, useRef,useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/Cropimage.js'
import { studentcontext } from '../context/StudentState';


const Addprofilebox = ({images,setimages}) => {

    const inputref = useRef(null);
    let cropref = useRef(null)
    const [imagesrc, setimagesrc] = useState(null);
    const [croppedimgsrc, setcroppedimgsrc] = useState(null);
    const [zoom,setzoom] = useState(1)
    const [croppedArea,setcroppedArea] = useState()
    const [crop,setcrop] = useState({x:0,y:0})
    const {thisStudent} = useContext(studentcontext)



    const addprofile = ()=>{
        inputref.current.click();
      }

      const displayImage = (event)=>{
        // event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          setimagesrc(reader.result);
          document.getElementById("cropbtn").disabled = false;
          cropref.current.click();
        });
        
      }
      
      const cropcomplete = (croppedArea,croppedAreaPixels)=>{
        setcroppedArea(croppedAreaPixels)
      }
      
      const closecropper = ()=>{
        setcroppedimgsrc(null)
        setimages({...images, "stimg":"none"})
      }
      
      
      
      const getcroppedimg = async (image, croppedAreapx)=>{
        try {
          const crpimg = await getCroppedImg(image,croppedAreapx);
          setcroppedimgsrc(crpimg)
          setimages({...images, "stimg":crpimg})
        //   const tempnewuser = {...newuser, userimg:crpimg}
        //   setnewuser(tempnewuser)
        //   console.log(newuser)
        } catch (error) {
          console.log(error);
        }
      }
      // "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
  return (
    <>
    <Box component="main" sx={{ flexGrow: 1, my:2}} className='container d-flex flex-column'>
        <div className="input-group" style={{height:"120px",width:"120px",border:"0px solid #041B36",borderRadius:"60px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",alignItems:"center",position:"relative"}}>
            <img src={croppedimgsrc !== null? croppedimgsrc:thisStudent.stimg !== "none"? thisStudent.stimg:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"} className="img-fluid" alt='' style={{color:"green",position:"absolute",top:"0%",height:"120px",width:"120px",borderRadius:"60px"}}/>
            {/* <label htmlFor="" id='icon2' style={{color:"green",position:"absolute",top:"60%",left:'20%',fontSize:"0.75rem"}}>Upload Profile</label> */}
            <input style={{backgroundColor:"transparent",border:"0px",display:"none"}}  type="file" ref={inputref} className="form-control mx-1" name='profile' aria-label="profile" aria-describedby="basic-addon1" onChange={displayImage}/>
            <Button className='profilebtn' id='mybtn' onClick={addprofile}><i className="bi bi-plus-circle-fill fs-4" style={{color:"white",position:"absolute"}}></i></Button>
            <span className="position-absolute translate-middle" id="basic-addon1" style={{border:"0px",top:"50%"}}><button className='btn' disabled={croppedimgsrc===null} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}} onClick={closecropper}><i className="bi bi-x-circle-fill fs-5" style={{color:"green"}}></i></button></span>
            <span className="position-absolute translate-middle rounded-circle" style={{border:"0px",top:"50%",left:"100%"}}><Button className='btn' data-bs-toggle="modal" ref={cropref} id="cropbtn" data-bs-target="#exampleModal" disabled={croppedimgsrc===null} style={{backgroundColor:"transparent", border:"0px",margin:"0px",padding:"0px"}}><i className="bi bi bi-aspect-ratio-fill fs-5" style={{color:"green"}}></i></Button></span>
        </div>
    </Box>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Crop Profile Picture</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" style={{height:"60vh"}}>
                  <Cropper image={imagesrc} crop={crop} zoom={zoom} onCropChange={setcrop} onZoomChange={setzoom} onCropComplete={cropcomplete} aspect={1} style={{height:"70vh"}}/>
              </div>
              <div className="modal-footer d-flex flex-column">
                <div className="container">
                   <Slider defaultValue={1} min={1} max={5} value={zoom} onChange={(e,zoom)=>{setzoom(zoom)}}/>
                </div>
                <div className="container d-flex flex-row">
                  <Button color="error" variant="outlined" sx={{m:1}} data-bs-dismiss="modal">Close</Button>
                  <Button color="success" variant="contained" size="small" sx={{m:1}} onClick={()=>{getcroppedimg(imagesrc,croppedArea)}} data-bs-dismiss="modal">Save changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default Addprofilebox




