
import {createContext, React,  useState } from "react";
const applicationcontext = createContext();

const ApplicationState = (props) => {
    
  const [allapplication,setallapplication] = useState([])
  // const [oneapplication,setoneapplication] = useState({})
  const commonRoute = 'http://localhost:5000/application'
  
  const fetchallapplication = async ()=>{
    const url = `${commonRoute}/fetchapplication`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        setallapplication(json)
  }

  const fetchoneapplication = async (id)=>{
    const url = `${commonRoute}/fetchapplication/${id}`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        return json
  }

  const addapplication = async (applicationitem)=>{
    const url = `${commonRoute}/addapplication`
      
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({"scid":applicationitem})
        });
        const json = await response.json()
        console.log(json)
  }
  
  const editapplication = async (applicationitem,id)=>{
    const url = `${commonRoute}/updateapplication/${id}`
      
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationitem)
        });
        const json = await response.json()
        console.log(json)
  }
  
  const dltapplication = async (id)=>{
    const url = `${commonRoute}/deleteapplication/${id}`
      
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        console.log(json)
  }
  return (
    <applicationcontext.Provider value={{allapplication,fetchallapplication,addapplication,dltapplication,fetchoneapplication,editapplication}}>
        {props.children}
    </applicationcontext.Provider>
  )
}

export default ApplicationState
export {applicationcontext};
