import React from "react";
import classnames from "classnames";
import "./DayListItem.scss"
// this is the specific day in the day list, it is rendered conditionally depending on the number of spots remaining for the day
export default function DayListItem(props) {
  let dayClass = classnames({
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  if (props.spots === 1){
    return (
      <li data-testid="day" className = {dayClass} onClick={() => props.setDay(props.name)}>
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{props.spots} spot remaining</h3>
      </li>
    );
  } else if (props.spots > 1) {
    return (
      <li data-testid="day" className = {dayClass} onClick={() => props.setDay(props.name)}>
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{props.spots} spots remaining</h3>
      </li>
    );
  } else if (props.spots === 0) {
    return (
      <li data-testid="day" className = {dayClass} onClick={() => props.setDay(props.name)}>
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light"> no spots remaining</h3>
      </li>
    );
  } else {
    return null
  }
  
}
