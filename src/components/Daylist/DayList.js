import React from "react";
import DayListItem from "./DayListItem.js"
// This is the list of days the user can select a specific day from.
const DayList = function (props) {
  const ListOfDays = props.days.map(day => {
      return(      
      <DayListItem 
        key = {day.id}
        id = {day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />)
    }
  )
  return(
    <ul>{ListOfDays}</ul>
  )
}

export default DayList