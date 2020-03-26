import React from "react";

import "./Application.scss";

import DayList from "components/Daylist/DayList.js"
import Appointment from "./Appointment/index"
import {getAppointmentsForDay} from "../helpers/selectors"
import {getInterviewersForDay} from "../helpers/selectors"
import {getInterview} from "../helpers/selectors"
import {useApplicationData} from "../hooks/useApplicationData"




export default function Application() {

  // We use this custom hook to import all of the state management logic from a seperate file. This was done to separate this logic from the rendering concern. 
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
    subtractSpot,
    addSpot
  } = useApplicationData();
  
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

// Here I create a new array of appointment components for each appointment in the appointments array for a given day. Each appointment component is passed the appropriate props.
const apptSchedule = appointments.map( appt => {
  const interview = getInterview(state, appt.interview);

return(
  <Appointment
  subtractSpot={subtractSpot}
  addSpot={addSpot}
  deleteInterview={deleteInterview}
  bookInterview={bookInterview}
  interviewers ={interviewers}
  interviewDetails={interview}
  key={appt.id} 
  {...appt}
  day={state.day}
  />
)
}
)


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
