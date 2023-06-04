
import {createContext, React,  useState } from "react";
const appereancecontext = createContext();

const Appereancestate = (props) => {
    
  const [bgcolor,setbgcolor] = useState("#0F8A90")
  const [color,setcolor] = useState("white")

  return (
    <appereancecontext.Provider value={{bgcolor,setbgcolor,color,setcolor}}>
        {props.children}
    </appereancecontext.Provider>
  )
}

export default Appereancestate
export {appereancecontext};
