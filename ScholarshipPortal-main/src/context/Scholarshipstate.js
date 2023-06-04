
import {createContext, React,  useState } from "react";
const scholarshipcontext = createContext();

const ScholarshipState = (props) => {
    
  const [allscholarship,setallscholarship] = useState([])
  // const [onescholarship,setonescholarship] = useState({})
  const commonRoute = 'http://localhost:5000/scholarship'
  
  const fetchallscholarship = async ()=>{
    const url = `${commonRoute}/fetchscholarship`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        setallscholarship(json)
  }

  const fetchonescholarship = async (id)=>{
    const url = `${commonRoute}/fetchscholarship/${id}`
      
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        return json
  }

  const addscholarship = async (scholarshipitem)=>{
    const url = `${commonRoute}/addscholarship`
      
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(scholarshipitem)
        });
        const json = await response.json()
        console.log(json)
  }
  
  const editscholarship = async (scholarshipitem,id)=>{
    const url = `${commonRoute}/updatescholarship/${id}`
      
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(scholarshipitem)
        });
        const json = await response.json()
        console.log(json)
  }
  
  const dltscholarship = async (id)=>{
    const url = `${commonRoute}/deletescholarship/${id}`
      
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
    <scholarshipcontext.Provider value={{allscholarship,fetchallscholarship,addscholarship,editscholarship,dltscholarship,fetchonescholarship}}>
        {props.children}
    </scholarshipcontext.Provider>
  )
}

export default ScholarshipState
export {scholarshipcontext};
