
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
  
  const editapplication = async (appstatus,id)=>{
    const url = `${commonRoute}/updateapplication/${id}`
      try { 
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: appstatus})
        });
        const json = await response.json()
        console.log(json)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
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
