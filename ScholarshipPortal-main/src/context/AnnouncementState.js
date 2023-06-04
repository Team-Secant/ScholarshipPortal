
import {createContext, React,  useState } from "react";
const announcementcontext = createContext();

const AnnouncementState = (props) => {
    
  const [allannounce,setallannounce] = useState([])
  // const [oneannounce,setoneannounce] = useState({})
  const commonRoute = 'http://localhost:5000/announcement'
  
  const fetchallannounce = async ()=>{
    const url = `${commonRoute}/fetchannounce`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        setallannounce(json)
  }

  const fetchoneannounce = async (id)=>{
    const url = `${commonRoute}/fetchannounce/${id}`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        return json
  }

  const addannounce = async (announceitem)=>{
    const url = `${commonRoute}/addannounce`
      
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(announceitem)
        });
        const json = await response.json()
        console.log(json)
  }
  
  const editannounce = async (announceitem,id)=>{
    const url = `${commonRoute}/updateannounce/${id}`
      
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(announceitem)
        });
        const json = await response.json()
        console.log(json)
  }
  
  const dltannounce = async (id)=>{
    const url = `${commonRoute}/deleteannounce/${id}`
      
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
    <announcementcontext.Provider value={{allannounce,setallannounce,fetchallannounce,addannounce,editannounce,dltannounce,fetchoneannounce}}>
        {props.children}
    </announcementcontext.Provider>
  )
}

export default AnnouncementState
export {announcementcontext};
