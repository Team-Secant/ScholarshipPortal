import React from 'react'

const PasswordStrength = (props) => {

    const {poorpw,weakpw,strongpw} = props;
    

  return (
    <>
    <div className="container d-flex Justify-content-center align-items-center flex-row mt-1">
        <div className="container" style={{height:"5px",border:"1px solid lightgrey", backgroundColor:poorpw?"red":"transparent"}}></div>
        <div className="container mx-1" style={{height:"5px",border:"1px solid lightgrey", backgroundColor:weakpw?"yellow":"transparent"}}></div>
        <div className="container" style={{height:"5px",border:"1px solid lightgrey", backgroundColor:strongpw?"green":"transparent"}}></div>
        <p className='fw-150 text-success mx-2 m-0' style={{fontSize:"0.9rem"}}>{(poorpw && !weakpw && !strongpw)&&"poor"}{(poorpw && weakpw && !strongpw)&&"weak"}{strongpw&&"strong"}</p>
    </div>  
    </>
  )
}

export default PasswordStrength;
