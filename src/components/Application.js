import React, {useState, useEffect} from "react";
import axios from "axios"

import "./Application.scss";

import DayList from "components/Daylist/DayList.js"
import Appointment from "./Appointment/index"


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Babar Azam",
      interviewer: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Naseem Shah",
      interviewer: { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Shadab Khan",
      interviewer: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" }
    }
  }
];

const apptSchedule = appointments.map( appt => {
return(
  <Appointment
    key={appt.id} {...appt}
  />
)
}
)

export default function Application(props) {
  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([])

  useEffect(()=>{
    console.log("TEST")
    axios.get("/api/days").then((response) => {
      console.log(response);
      setDays(response.data)
    });
    
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
          days={days}
          day={day}
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
