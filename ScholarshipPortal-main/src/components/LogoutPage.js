import React from 'react'

const LogoutPage = () => {
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center flex-column my-5 py-3" style={{borderRadius:"25px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <p>Are you sure you want to logout?</p>
        <div className="container d-flex justify-content-center align-items-center flex-row">
            <button className="btn btn-danger mx-1">Yes</button>
            <button className="btn btn-success mx-1">No</button>
        </div>
    </div>
    </>
  )
}

export default LogoutPage
