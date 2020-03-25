
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

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0){
    return []
  } else {
  const selectedDay = state.days.filter(d => d.name === day)
  if (selectedDay.length === 0){
    return []
  } else {
  const {interviewers} = selectedDay[0]
  const interviewersArray = interviewers.map((interviewer) => {
    return (
      state.interviewers[interviewer]
    )
  })
  return interviewersArray
  }
  }

}


export function getInterview(state, appointmentInterview) {

  if(!appointmentInterview){return null} else {
    const studentName = appointmentInterview.student;
    const interviewerId = appointmentInterview.interviewer

  const allInterviewers= state.interviewers 
  
  let interviewDetails = {}

  const getInterviewConductor = function (){
    const interviewerDetails = []
    for(const person in allInterviewers) {
    if(allInterviewers[person].id === interviewerId){
      interviewerDetails.push(allInterviewers[person].id)
      interviewerDetails.push(allInterviewers[person].name)
      return interviewerDetails
    }
  }
}
const InterviewConductor = getInterviewConductor()
interviewDetails = {student:studentName, interviewer:InterviewConductor[0], interviewerName:InterviewConductor[1]}
  return interviewDetails
  }
  

}


