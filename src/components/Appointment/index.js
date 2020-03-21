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
console.log(props.interview)

//   const getInterviewerName = function (id, interviewers) {
//     for(const interviewer of interviewers){
//       if(interviewer.id === id){
//         return interviewer.name
//       }
//     }
//     }

// const interviewerName = getInterviewerName(props.id, props.interviewers)

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "STATUS";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => {transition(CREATE)};
  const onCancel = () => {transition(EMPTY)};
  const onConfirm = () => {transition(CONFIRM)};
  const onEdit = () => {transition(EDIT)};

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
          onEdit={onEdit}
          interviewDetails={props.interviewDetails}
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
        {mode === EDIT && (
        <Form
          interviewers= {props.interviewers}
          interviewer={props.interview.interviewer}
          name={props.interview.student}
          onCancel={onCancel}
          save = {save}
        />
        )}
      </article>
  )
}

export default Appointment