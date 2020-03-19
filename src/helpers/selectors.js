
const getAppointmentsForDay = function (state, day) {
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

export default getAppointmentsForDay

