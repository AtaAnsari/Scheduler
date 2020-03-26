import React from "react"
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types';
// This is the list of interviewers rendered in the form. The user may select a particular interviewer from this list.
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
        onChange={(event)=> props.onChange(interviewer.id)}
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

InterviewerList.propTypes = {
  onChange: PropTypes.func
};