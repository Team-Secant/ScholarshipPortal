import React, { useContext, useRef } from 'react'
import { scholarshipcontext } from '../../context/Scholarshipstate'


const ConfirmationModal = ({status, id}) => {

    const {updatestatus} = useContext(scholarshipcontext);
    const dismiss = useRef(0);
    const spinnerref = useRef(0);
    const confirmupdate = async ()=>{
        spinnerref.current.classList.remove("d-none")
        let check = await updatestatus(status, id);
        spinnerref.current.classList.add("d-none")
        if(check===true){
            dismiss.current.click();
        }
    }

  return (
    <>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmation</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            Are you Sure you want to proceed?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref={dismiss}>Close</button>
            <button className="btn btn-success d-flex justify-content-center align-items-center" onClick={confirmupdate}>
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

export default ConfirmationModal
