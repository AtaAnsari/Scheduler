import {useState, useEffect} from "react"
import axios from "axios"

// custom hook that stores all of the data retrieved from the api in state. 
export function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({day: "Monday", days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  },[])
  // Determines which day is currently selected by the user
  function getDayFromDays(day, daysArray){
    for (const d of daysArray){
      if(d.name === day){
        return d.spots
      }
    }
  }
  // Determine the index of the currently selected day in the array of days. 
  function getDayIndex(day, daysArray){
    for (const d of daysArray){
      if(d.name === day){
        return daysArray.indexOf(d)
      }
    }
  }
// subtracts from the number of spots remaining when a user books a new appointment. 
  function subtractSpot(day) {
    const spots = getDayFromDays(day, state.days) - 1
    const index = getDayIndex(day, state.days)

    setState((state) => ({
      
      ...state,
      ...state.days[index ]["spots"]=spots
      
    })
    )
}
// adds to the number of spots remaining when a user cancels an appointment. 
function addSpot(day) {
  const spots = getDayFromDays(day, state.days) + 1
  const index = getDayIndex(day, state.days)

  setState((state) => ({
    
    ...state,
    ...state.days[index ]["spots"]=spots
    
  })
  )
}
// submits a put request to the api to update the db with the details of a new appt
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
  return  axios.put(`/api/appointments/${id}`, appointment)
    .then(
      (res) => {
        setState((state) => ({
          
          ...state,
          appointments: {
            ...state.appointments,
            [id]: appointment
          }
        })
        )
      }

    )
}
// submits a delete request to the api to update the db when and appointment is deleted
function deleteInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

return  axios.delete(`/api/appointments/${id}`)
  .then(
    (res) => {
      setState((state) => ({
  
        ...state,
        appointments: {
          ...state.appointments,
          [id]: appointment
        }
      })
      )
    }

  )
}

return {
  state,
  setDay,
  bookInterview,
  deleteInterview,
  setState,
  addSpot,
  subtractSpot
};

}