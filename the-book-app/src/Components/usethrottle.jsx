
import React, { useEffect, useRef, useState } from 'react'

const useThrottle = (value ,delay) => {
  const thottlrid=useRef(false)
  const [thottletext,setthrottletext]=useState("")

  useEffect(()=>{
    if(!thottlrid.current){
        thottlrid.current=true
        setTimeout(() => {
            thottlrid.current=false
            setthrottletext(value)
        }, delay);
    }
  },[delay,value])

  return thottletext
}

export default useThrottle