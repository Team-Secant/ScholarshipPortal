import React, { useContext, useRef } from 'react'
import { applicationcontext } from '../../context/ApplicationState';
// import { studentcontext } from '../../context/StudentState';
import {toast } from 'react-toastify';


const ConfirmationModal = ({status,id,email}) => {

    const {editapplication} = useContext(applicationcontext);
    const dismiss = useRef(0);
    const spinnerref = useRef(0);
    const confirmupdate = async ()=>{
        console.log(email)
        spinnerref.current.classList.remove("d-none")
        let check = await editapplication(status,id,email);
        spinnerref.current.classList.add("d-none")
        if(check===true){
            dismiss.current.click();
        }else{
            spinnerref.current.classList.add("d-none")
            toast.error("Some Error Occured! Please try again later.")
        }
    }

    // useEffect(()=>{
    //     fetchThisStudent();
    //     // eslint-disable-next-line
    // },[])

  return (
    <>
    <div class="modal fade" id="appsmodal" tabindex="-1" aria-labelledby="appsmodal" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmation</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            Are you Sure you want to proceed to {status} for {id}?
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
