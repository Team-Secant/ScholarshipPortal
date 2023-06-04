import { useTheme } from '@emotion/react';
import React from 'react'

const Announcementrow = ({item,index}) => {

    const theme = useTheme();

  return (
    <>
    {<tr style={{color:theme.palette.mode === "dark"&&theme.palette.grey[100]}}>
        <th scope="row" style={{textAlign:"center"}}>{index+1}</th>
        <td>{item.title}</td>
        <td>{item.description.slice(0,20)}...</td>
        <td>{item.date.slice(0,10)}</td>
        {/* <td><button className="btn btn-outline-danger btn-sm float-end" style={{borderRadius:"20px"}}>withdraw</button></td> */}
    </tr>}
    </>
  )
}

export default Announcementrow
