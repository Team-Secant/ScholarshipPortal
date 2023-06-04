import React from 'react'

const PageNotExist = () => {
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center flex-column p-5">
        <img className='img-fluid' src={require('../asset/searchimage.png')} alt="" width="500px"/>
        <h6 className='fw-bold fs-5'>Sorry! Your Page doesn't exist.</h6>
    </div>
    </>
  )
}

export default PageNotExist
