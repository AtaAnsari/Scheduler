import {React, useState} from "react"

export function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
  
  const transition = function(newMode, replace = false){
    if(replace === true) {
      const currentHistory = history.slice(0, 1)
      setHistory(currentHistory.concat(newMode))
      setMode(newMode)
    } else {
      setHistory(history.concat(newMode))
      setMode(newMode)
    }

} 
  const back = function(){
    if(history.length > 1){
      const newHistory = history.slice(0, history.length -1)
      setHistory(newHistory)
      setMode(newHistory[newHistory.length-1])} 
    }

  return {
    mode,
    transition,
    back
  };
}



