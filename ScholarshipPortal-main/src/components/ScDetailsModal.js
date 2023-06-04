import React, { useContext } from 'react'
import { applicationcontext } from '../context/ApplicationState'

const ScDetailsModal = ({item,thisstapplication}) => {

    const {addapplication} = useContext(applicationcontext)
    const thissc = thisstapplication.filter((each)=>{return each.scid === item._id})

    const applysc = ()=>{
        addapplication(item._id)
    }

  return (
    <>

    <div className="modal fade" id="Scmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{item.name}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>{item.description}</p>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-light" style={{border:"1px solid black"}} data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" disabled={thissc.length>0} onClick={applysc}>{thissc.length>0?"Applied":"Apply"}</button>
            </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default ScDetailsModal
