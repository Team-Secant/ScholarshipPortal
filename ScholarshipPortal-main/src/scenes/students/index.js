import React, { useState, useContext, useEffect } from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    // Rating,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import Header from "../../components/Header"
import { studentcontext } from "../../context/StudentState";
import StInfoModal from "./StInfoModal";

// import { useGetProductsQuery } from "./state/api";


// coming from backend
const Product = ({item,setdata}) => {

    // fname,
    // lname,
    // stimg,
    // // description={description}
    // stbatch,
    // // rating={rating}
    // stdepart,
    // email,
    // stcgpa,
    // cnic
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
            }}
        >

            <CardContent>
                <div className="container" >
                    <img className="img-fluid" src={item.stimg==="none"?require('../../asset/pp.jpeg'):item.stimg} alt="" width="100px" height="100px" style={{borderRadius:"50px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}/>
                </div>
                <Typography
                    sx={{ fontSize: 16, mt:2, fontWeight:"bolder" }}
                    color={theme.palette.secondary[400]}
                    gutterBottom
                >
                    {item.fname} {item.lname}
                </Typography>
                <Typography variant="h6" noWrap component="div">
                    {item.cnic}
                </Typography>
                {/* <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    {Number(stcgpa).toFixed(2)}
                </Typography> */}
                {/* <Rating value={rating} readOnly /> */}

                {/* <Typography variant="body2">{description}</Typography> */}
            </CardContent>

            <CardActions>
                <Button variant="primary" size="small" data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={()=>{setdata(item)}}>
                    See More
                </Button>
            </CardActions>
        
            
            {/* onClick={() => setIsExpanded(!isExpanded)} */}

            {/* <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300],
                }}
            >
                <CardContent>
                    <Typography>Email: {email}</Typography>
                    <Typography>CGPA: {stcgpa}</Typography>
                    <Typography>
                        Department: {stdepart}
                    </Typography>
                    <Typography>
                        Batch: {stbatch}
                    </Typography>
                </CardContent>
            </Collapse> */}
        </Card>

    )
}


const Products = () => {
    
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const {allst,fetchallstudent} = useContext(studentcontext)
    const [data,setdata]=useState({});
    const [searchValue, setsearchValue] = useState("");
  const filteredstudents = allst.filter(element => {return element.fname.toLowerCase().includes(searchValue.toLowerCase()) || element.lname.toLowerCase().includes(searchValue.toLowerCase()) || element.cnic.includes(searchValue)})

    useEffect(()=>{
        fetchallstudent();
    })

    const handleSearch = (e)=>{
        setsearchValue(e.target.value)
      }

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="STUDENTS" subtitle="See your list of all Students." />
            <div class="input-group mx-2 my-4" style={{borderRadius:"20px"}}>
                <span class="input-group-text" id="basic-addon1" style={{backgroundColor:"transparent",border:"0px"}}><i class="bi bi-search"></i></span>
                <input style={{backgroundColor:"transparent",border:"0px"}} type="text" value={searchValue} onChange={handleSearch} class="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <StInfoModal data={data}/>
            {filteredstudents.length > 0 ? (
                <Box mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}>

                    {filteredstudents.map(
                        (item,index) => (
                            <Product      // destructure krke product ko pass
                                key={index}
                                _id={index}
                                item={item}
                                setdata={setdata}
                            />
                        )
                    )}

                </Box>
            ) : (
                <>
                {allst.length===0?"Loading..."
                :
                <div className="container d-flex justify-content-center align-items-center flex-column">
                    <img className='img-fluid' src={require("../../asset/searchimage.png")} alt="" width="300vw" height="auto"/>
                    <h4 className='fs-4 fw-bold'>No results found. Try a different Keyword.</h4>
                </div>
                }</>
            )}
        </Box>
    );
};

export default Products