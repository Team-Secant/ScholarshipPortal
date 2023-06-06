import React from 'react'
import { useTheme } from '@emotion/react';

const StInfoModal = ({data}) => {

    const theme = useTheme();

    const widthimg = '200px'
    const heightimg = '200px'

  return (
    <>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">
            <div class="modal-header" style={{color:theme.palette.mode === "dark"&&"black"}}>
                <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Student's Information</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style={{color:theme.palette.mode === "dark"&&"black"}}>
                <div className="container p-0">

                    <div className="row d-flex justify-content-center align-items-center p-0 p-md-5" >
                        <div className="col-12 col-md-6 col-xl-6 d-flex justify-content-center align-items-center flex-row">
                            <div className="container d-flex justify-content-center align-items-center my-3">
                                <img className="img-fluid" src={data?.stimg==="none"?require('../../asset/pp.jpeg'):data?.stimg} alt="" width="160px" height="160px" style={{borderRadius:"80px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6 d-flex justify-content-start align-items-start flex-column">
                            <div className="d-flex justify-content-start align-items-center flex-row my-1">
                                <label className='fs-6 fw-bold' htmlFor="">Name:</label>
                                <div style={{width:"100%"}}>
                                    <p className='fs-6 mx-3 mb-0' style={{overflowWrap: "break-word"}}>{data?.fname !== undefined?data?.fname:"Loading..."} {data?.lname !== undefined?data?.lname:"Loading..."}</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center flex-row my-1">
                                <label className='fs-6 fw-bold' htmlFor="">Type:</label>
                                <div style={{width:"100%"}}>
                                    <p className='fs-6 mx-3 mb-0' style={{overflowWrap: "break-word"}}>{data?.sttype !== undefined?data?.sttype:"Loading..."}</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center flex-row my-1">
                                {/* <label className='fs-6 fw-bold' htmlFor="">Roll No:</label> */}
                                <div style={{width:"100%"}}>
                                    <p className='fs-6 mb-0' style={{overflowWrap: "break-word"}}><b>Roll No:</b> {data?.rollno !== undefined?data?.rollno:"Loading..."}</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-start flex-row my-1">
                                <label className='fs-6 fw-bold' htmlFor="">Email:</label>
                                <div style={{width:"80%"}}>
                                    <p className='fs-6 mx-3 mb-0' style={{overflowWrap: "break-word"}}>{data?.email !== undefined?data?.email:"Loading..."}</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-start flex-row my-1">
                                <label className='fs-6 fw-bold' htmlFor="">Cnic:</label>
                                <div style={{width:"100%"}}>
                                    <p className='fs-6 mx-3 mb-0' style={{overflowWrap: "break-word"}}>{data?.cnic !== undefined?data?.cnic:"Loading..."}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-start flex-row my-1">
                                <label className='fs-6 fw-bold' htmlFor="">Batch:</label>
                                <div style={{width:"80%"}}>
                                    <p className='fs-6 mx-3 mb-0' style={{overflowWrap: "break-word"}}>{data?.stbatch !== undefined?data?.stbatch:"Loading..."}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-start flex-row my-1">
                                {/* <label className='fs-6 fw-bold' htmlFor="">Department:</label> */}
                                <div style={{width:"100%"}}>
                                    <p className='fs-6 mb-0' style={{overflowWrap: "break-word"}}><b>Department:</b> {data?.stdepart !== undefined?data?.stdepart:"Loading..."}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-start flex-row my-1">
                                <label className='fs-6 fw-bold' htmlFor="">CGPA:</label>
                                <div style={{width:"100%"}}>
                                    <p className='fs-6 mx-3 mb-0' style={{overflowWrap: "break-word"}}>{data?.stcgpa !== undefined?data?.stcgpa:"Loading..."}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-start flex-row my-1">
                                {/* <label className='fs-6 fw-bold' htmlFor="">Category Of Admission:</label> */}
                                <div style={{width:"100%"}}>
                                    <p className='fs-6 mb-0' style={{overflowWrap: "break-word"}}><b>Category Of Admission:</b> {data?.cao !== undefined?data?.cao:"Loading..."}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="row d-flex justify-content-start align-items-center p-2">
                        <h4 className="fs-4 fw-bold text-center p-2" style={{borderTop:"1px solid black",borderBottom:"1px solid black"}}>Documents</h4>

                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.stsscms==="none"?require('../../asset/pp.jpeg'):data?.stsscms} target="_blank"><img className="img-fluid" src={data?.stsscms==="none"?require('../../asset/pp.jpeg'):data?.stsscms} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">SSC Marksheet</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.sthscms==="none"?require('../../asset/pp.jpeg'):data?.sthscms} target="_blank"><img className="img-fluid" src={data?.sthscms==="none"?require('../../asset/pp.jpeg'):data?.sthscms} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">HSC Marksheet</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.stunicard==="none"?require('../../asset/pp.jpeg'):data?.stunicard} target="_blank"><img className="img-fluid" src={data?.stunicard==="none"?require('../../asset/pp.jpeg'):data?.stunicard} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">Student ID card</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.depcnic==="none"?require('../../asset/pp.jpeg'):data?.depcnic} target="_blank"><img className="img-fluid" src={data?.depcnic==="none"?require('../../asset/pp.jpeg'):data?.depcnic} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">Dependant CNIC</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.ssccert==="none"?require('../../asset/pp.jpeg'):data?.ssccert} target="_blank"><img className="img-fluid" src={data?.ssccert==="none"?require('../../asset/pp.jpeg'):data?.ssccert} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">SSC Certificate</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.unims==="none"?require('../../asset/pp.jpeg'):data?.unims} target="_blank"><img className="img-fluid" src={data?.unims==="none"?require('../../asset/pp.jpeg'):data?.unims} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">University Transcript</label>
                            </div>
                        </div>
                        {data?.sttype!=="Merit-based"&&
                        <>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.depsalaryimg==="none"?require('../../asset/pp.jpeg'):data?.depsalaryimg} target="_blank"><img className="img-fluid" src={data?.depsalaryimg==="none"?require('../../asset/pp.jpeg'):data?.depsalaryimg} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">Dependant Income Slip</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.billimg1==="none"?require('../../asset/pp.jpeg'):data?.billimg1} target="_blank"><img className="img-fluid" src={data?.billimg1==="none"?require('../../asset/pp.jpeg'):data?.billimg1} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">Bill # 1</label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                                <a href={data?.billimg2==="none"?require('../../asset/pp.jpeg'):data?.billimg2} target="_blank"><img className="img-fluid" src={data?.billimg2==="none"?require('../../asset/pp.jpeg'):data?.billimg2} alt="" width={widthimg} height={heightimg} style={{borderRadius:"0px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/></a>
                                <label className='fs-6 fw-bold my-2' htmlFor="">Bill # 2</label>
                            </div>
                        </div></>}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                {/* <button type="button" class="btn btn-primary">Save changes</button> */}
            </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default StInfoModal
