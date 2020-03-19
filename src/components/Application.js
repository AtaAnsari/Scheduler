import React, {useState, useEffect} from "react";
import axios from "axios"

import "./Application.scss";

import DayList from "components/Daylist/DayList.js"
import Appointment from "./Appointment/index"
import {getAppointmentsForDay} from "../helpers/selectors"




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  
  const appointments = getAppointmentsForDay(state, state.day)
 
const apptSchedule = appointments.map( appt => {
  // const interview = getInterview(state, appointment.interview);
  console.log(appt.interview);
return(
  <Appointment
  key={appt.id} {...appt}
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
