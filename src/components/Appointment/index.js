import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import {useVisualMode} from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"



const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "STATUS";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => {transition(CREATE)};
  const onCancel = () => {transition(EMPTY)};

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW)) 
  }
  

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
          onCancel={onCancel}
          save = {save}
        />
        )}
        {mode === SAVING && (
        <Status/>
        )}
      </article>
  )
}

export default Appointment