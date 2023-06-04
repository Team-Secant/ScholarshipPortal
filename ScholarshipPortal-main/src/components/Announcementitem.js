import React from 'react'
import Box from '@mui/material/Box';

const Announcementitem = ({item,index}) => {

  return (
    <>
    <div className="card m-4" style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
        <div className="card-header">Announcement # {index+1}</div>
        <div className='d-flex justify-content-center align-items-start flex-row'>
            <div className='d-flex flex-column'>
                <div className="card-body text-dark">
                    <h5 className="card-title fw-bold">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                </div>
                <Box className="d-flex justify-content-start align-items-center" sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <h6 className='text-center mx-2'><span className="badge bg-dark p-2" style={{borderRadius:"0px"}}>Date: {item.date.slice(0,10)}</span></h6>
                </Box>
            </div>
            <Box sx={{ flexGrow: 1}}/>
            <button className="btn m-5" style={{backgroundColor:"#041B36", color:"white"}}>Details</button>
        </div>
    </div>
    {/* <Card className='my-3' sx={{ display: 'flex' }} style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
      <img className='p-4' src="https://img.icons8.com/external-justicon-flat-justicon/100/null/external-graduation-elearning-and-education-justicon-flat-justicon-1.png" alt="Scholarships list"/>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent className='d-flex flex-row'>
            <div>
                <Typography component="div" variant="h5">
                    {item.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {item.description}
                </Typography>
            </div>
            <Box sx={{ flexGrow: 1}}/>
            <button className="btn btn-secondary mx-4" style={{backgroundColor:"grey"}}>Details</button>
        </CardContent>
        <Box className="d-flex justify-content-start align-items-center" sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <h6 className='text-center mx-2'><span className="badge bg-success"> Starting from: {item.start_date}</span></h6>
            <h6 className='text-center mx-2'><span className="badge bg-danger">{item.end_date}</span></h6>
        </Box>
      </Box>
    </Card> */}
    </>
  )
}

export default Announcementitem
