import React from "react"
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

const InterviewerList= function (props) {
  let listOfInterviewers = props.interviewers.map(
    interviewer => {
      return(
        <InterviewerListItem 
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        // selected={interviewer.id === props.interviewer}
        onChange={(event)=> props.onChange(interviewer.id)}
        // setInterviewer={(event)=> props.setInterviewer(interviewer.id)}
        />
      )
    }
  )
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {listOfInterviewers}
    </ul>
  </section>
  )
}

export default InterviewerList