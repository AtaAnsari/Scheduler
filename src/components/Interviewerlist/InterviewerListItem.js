import React from "react";
import "./InterviewerListItem.scss"
import classnames from "classnames"

const InterviewerListItem = function (props) {
  let interviewerClass = classnames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  })
  return (
<li onClick={props.onChange} className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src= {props.avatar}
    alt= {props.name}
  />
  {props.selected && props.name}
</li>

  )
}

export default InterviewerListItem