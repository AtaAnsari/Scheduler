import React, {useState, useEffect} from "react";
import axios from "axios"

import "./Application.scss";

import DayList from "components/Daylist/DayList.js"
import Appointment from "./Appointment/index"
import {getAppointmentsForDay} from "../helpers/selectors"
import {getInterviewersForDay} from "../helpers/selectors"
import {getInterview} from "../helpers/selectors"





export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
  return  axios.put(`/api/appointments/${id}`, appointment)
    .then(
      (res) => {
        console.log(res)
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

function deleteInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

return  axios.delete(`/api/appointments/${id}`)
  .then(
    (res) => {
      console.log(res)
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
  

const apptSchedule = appointments.map( appt => {
  const interview = getInterview(state, appt.interview);
  // console.log('interview', interview );
return(
  <Appointment
  deleteInterview={deleteInterview}
  bookInterview={bookInterview}
  interviewers ={interviewers}
  interviewDetails={interview}
  key={appt.id} 
  {...appt}
  />
)
}
)

  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  },[])
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {apptSchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
