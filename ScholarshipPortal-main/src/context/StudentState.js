
import {createContext, React,  useState } from "react";
import { toast } from 'react-toastify';
const studentcontext = createContext();

const StudentState = (props) => {
    
  const [thisStudent,setthisStudent] = useState({})
  const [notallowed,setnotallowed] = useState(false)

  const commonRoute = 'http://localhost:5000/student'
  
  const [stcredential, setstcredential] = useState({
    "usertype": "",
    "cao": "",
    "fname": "",
    "lname": "",
    "province": "",
    "district": "",
    "resadd": "",
    "peradd": "",
    "fatherstat": "",
    "motherstat": "",
    "rollno": "",
    "cnic": "",
    "contact": "",
    "sttype": "",
    "stdepart": "",
    "stbatch": "",
    "stdegree": "",
    "stsem": "",
    "styear": "",
    "stcgpa": "",
    "email": "",
    "password": ""
})

const [depinfo,setdepinfo] = useState({
  depname: "",
  deprel:"",
  depoccup: "",
  depincome: "",
  totalearner: "",
  famincome: "",
  depcontact: "",
  depresadd: "",
  monetaryamount: ""
})


const [allst,setallst] = useState([]);

  const fetchThisStudent = async ()=>{

        const url = `${commonRoute}/getstudent`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setthisStudent(json)
  }
  const fetchallstudent = async ()=>{

        const url = `${commonRoute}/getallstudent`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        setallst(json)
  }
  const fetchonestudent = async (stid)=>{

        const url = `${commonRoute}/getindstudent/${stid}`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        return json
  }
  const updateThisStudent = async (updatedinfo)=>{

        const url = `${commonRoute}/editstudent`
      
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(updatedinfo)
        });
        const json = await response.json()
        return json
  }

  const updatedepinfo = async (updatedinfo,id)=>{

        const url = `http://localhost:5000/dependant/updatedependant/${id}`
      
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedinfo)
        });
        const json = await response.json()
        return json
  }

  const fetchdepbystid = async (stid)=>{

        const url = `http://localhost:5000/dependant/fetchdependantbyst/${stid}`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const json = await response.json()
        setdepinfo(json[0])
  }

  const fetchdepbystid2 = async (stid)=>{

        const url = `http://localhost:5000/dependant/fetchdependantbyst/${stid}`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const json = await response.json()
        return json[0]
  }

  const updateStDocs = async (docs)=>{

        const url = `${commonRoute}/updatestdocs`
      
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(docs)
        });
        const json = await response.json()
       return json
  }
  const dltStDocs = async (docsid)=>{

        const url = `${commonRoute}/dltdocs`
      
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(docsid)
        });
        const json = await response.json()
        return json
  }

  const dltindst = async (stid)=>{

    try {
      const url = `${commonRoute}/dltindstudent/${stid}`
    
      const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
      });
      const json = await response.json()
      console.log(json)
      return true
      
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const stlogin = (email,signinsubmit)=>{
    const domain = email.split('@')
    if(domain[1] === 'cloud.neduet.edu.pk'){
      signinsubmit();
    }
    else{
      // alert("please use correct email address")
      toast.error("Please use correct email address!")
    }
  }

  const checkinfofilled = async ()=>{
    await fetchThisStudent();
    const depinfo2  =  await fetchdepbystid2(thisStudent._id);

    console.log(thisStudent)
    const filterst = Object.entries(thisStudent).reduce((acc, [key, value]) => {
      if (value === "none" && key !== "stimg" && key!==key+"pid" && thisStudent.sttype ==="Merit-Based" && key!=="depsalaryimg" && key!=="billimg1" && key!=="billimg2") {
        acc[key] = thisStudent[key];
      }
      if (value === "none" && key !== "stimg" && key!==key+"pid" && thisStudent.sttype ==="Need-Based") {
        acc[key] = thisStudent[key];
      }
      return acc;
    }, {});
    // console.log(filterst) 
    // const depinfoobj = depinfo[0]
    console.log(depinfo2)
    const filterdep = Object.entries(depinfo2).reduce((acc, [key, value]) => {
      if (value === "none" && key!=="monetaryamount") {
        acc[key] = depinfo2[key];
      }
      return acc;
    }, {});
    // console.log(filterdep)

    if(Object.keys(filterst).length>0 || Object.keys(filterdep).length>0){
      setnotallowed(true)
    }
    else{
      setnotallowed(false)
    }


  }

  

  return (
    <studentcontext.Provider value={{thisStudent,depinfo,fetchThisStudent,updateThisStudent,updatedepinfo,updateStDocs,dltStDocs,stlogin,stcredential,setstcredential,fetchallstudent,allst,fetchonestudent,fetchdepbystid,notallowed,checkinfofilled,dltindst}}>
        {props.children}
    </studentcontext.Provider>
  )
}

export default StudentState
export {studentcontext};
