import React from 'react'

const Announceline = ({announceline}) => {
  return (
    <>
    <div className="container">
      <marquee className="text-center" style={{width:"100%"}}>{announceline}</marquee>
    </div>
    </>
  )
}

export default Announceline
