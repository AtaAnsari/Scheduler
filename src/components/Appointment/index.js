import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import {useVisualMode} from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"



const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "STATUS";
  const CONFIRM = "CONFIRM";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => {transition(CREATE)};
  const onCancel = () => {transition(EMPTY)};
  const onConfirm = () => {transition(CONFIRM)};

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW)) 
  }

  function deleteIt(id) {
    console.log('this is the id:', id)
    transition(SAVING);
    props.deleteInterview(id)
    .then(() => transition(EMPTY)) 
  }
  

  return(
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={onConfirm}
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
        {mode === CONFIRM && (
        <Confirm
        deleteIt={deleteIt}
        id={props.id}
        />
        )}
      </article>
  )
}

export default Appointment