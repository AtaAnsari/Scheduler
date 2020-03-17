import React from "react";
import DayListItem from "./DayListItem.js"
const DayList = function (props) {
  const ListOfDays = props.days.map(day => {
      return(      
      <DayListItem 
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