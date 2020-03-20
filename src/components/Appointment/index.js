import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import {useVisualMode} from "../../hooks/useVisualMode"
import Form from "./Form"



const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => {transition(CREATE)};
  const onCancel = () => {transition(EMPTY)};

  return(
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        )}
        {mode === CREATE && (
        <Form
          interviewers= {props.interviewers}
          onSave={props.onSave}
          onCancel={onCancel}
        />
        )}

      </article>
  )
}

export default Appointment