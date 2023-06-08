import React, { useContext, useRef } from 'react'
import { studentcontext } from '../context/StudentState';
import { useNavigate } from 'react-router-dom'

const Confirmationmodal = ({stid}) => {
    
const {dltindst} = useContext(studentcontext);
    const dismiss = useRef(0);
    const spinnerref = useRef(0);
    const navigate = useNavigate()

    const confirmdlt = async ()=>{
        spinnerref.current.classList.remove("d-none")
        let check = await dltindst(stid);
        spinnerref.current.classList.add("d-none")
        if(check===true){
            dismiss.current.click();
            navigate('/login')
            localStorage.removeItem('token')
        }
    }

  return (
    <>
    <div class="modal fade" id="confirmdlt" tabindex="-1" aria-labelledby="confirmdlt" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">Confirmation</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-dark">
            Are you Sure you want to proceed?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref={dismiss}>Close</button>
            <button className="btn btn-danger d-flex justify-content-center align-items-center" onClick={confirmdlt}>
                <div className="spinner-border spinner-border-sm text-light d-none" ref={spinnerref} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="fs-6 m-0 mx-2">Ok</p>
            </button>
            {/* <button type="button" class="btn btn-primary" >OK</button> */}
        </div>
        </div>
    </div>
    </div>
      
    </>
  )
    
}

export default Confirmationmodal

