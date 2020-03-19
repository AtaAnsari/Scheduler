
export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0){
    return []
  } else {
  const selectedDay = state.days.filter(d => d.name === day)
  if (selectedDay.length === 0){
    return []
  } else {
  const {appointments} = selectedDay[0]
  const appointmentsArray = appointments.map((appointment) => {
    return (
      state.appointments[appointment]
    )
  })
  return appointmentsArray
  }
  }

}

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
  
};

export function getInterview(state, appointmentInterview) {

  if(!appointmentInterview){return null} else {
    const studentName = appointmentInterview.student;
    const interviewerId = appointmentInterview.interviewer

  const allInterviewers= state.interviewers 
  
  let interviewDetails = {}

  const getInterviewConductor = function (){
    for(const person in allInterviewers) {
    if(allInterviewers[person].id === interviewerId){
      return allInterviewers[person]
    }
  }
}
const InterviewConductor = getInterviewConductor()
interviewDetails = {student:studentName, interviewer:InterviewConductor}
  return interviewDetails
  }
  

}


