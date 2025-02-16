import React, { useEffect,useState,} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {

const navigate=useNavigate()
const [loader,setLoader]=useState(true)
const authStatus= useSelector(state =>state.auth.status)

useEffect(()=>{
  //:TODO: Make it more simple code 
    if(authentication && authStatus!== authentication){
      navigate("/login")
    } else if(!authentication&&authStatus!==authentication){
      navigate("/")
    }
    // if (authStatus === undefined) {
    //   console.log("AuthStatus error");
      
    //   return
    // }
    // if (authentication && !authStatus) {
    //   navigate("/login")
    // } else if (!authentication && authStatus) {
    //   navigate("/")
    // }
    // setLoader(false)
    setLoader(false)
},[authStatus,navigate,authentication])

  return loader? <h1>Loading...</h1>:<>{children}</>
}
