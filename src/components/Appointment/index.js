import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import {useVisualMode} from "../../hooks/useVisualMode"
import Form from "./Form"
import Saving from "./Saving"
import Deleting from "./Deleting"
import Confirm from "./Confirm"
import Error from "./Error"



const Appointment = function (props) {
  // Defining mode variables so that transitions can occur
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  // Using custom hook to track the mode and manipulate it
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // Defining functions that will transition the mode
  const onAdd = () => {transition(CREATE)};
  const onCancel = () => {transition(EMPTY)};
  const onConfirm = () => {transition(CONFIRM)};
  const onEdit = () => {transition(EDIT)};
  const onCancelEdit = () => {transition(SHOW)};
  const onCancelConfirm = () => {transition(SHOW)};
  const onCloseError = () => {back()};
// This function will use the name and interviewer details passed to it to create an interview object and will call the bookInterview function with this interview, which in turn will update the db. 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    mode === CREATE && props.subtractSpot(props.day)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => {
      transition(ERROR_SAVE, true)
  });
  }
// This function will be called with the id of the appointment that needs to be cancelled. It will then call the deleteInterview function which will then update the db
  function deleteIt(id) {
    transition(DELETING, true);
    props.addSpot(props.day)
    props.deleteInterview(id)
    .then(() => transition(EMPTY))
    .catch(error => {
      transition(ERROR_DELETE, true)
  });
  }
  
  return(
      <article data-testid="appointment" className="appointment">
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
        <Saving/>
        )}
        {mode === DELETING && (
        <Deleting/>
        )}
        {mode === CONFIRM && (
        <Confirm
        deleteIt={deleteIt}
        id={props.id}
        onCancelConfirm={onCancelConfirm}
        />
        )}
        {mode === EDIT && (
        <Form
          interviewers= {props.interviewers}
          interviewer={props.interview.interviewer}
          name={props.interview.student}
          onCancel={onCancelEdit}
          save = {save}
        />
        )}
        {mode === ERROR_SAVE && (
        <Error
        message="Could not save appointment"
        onCloseError={onCloseError}
        />
        )}
        {mode === ERROR_DELETE && (
        <Error
        message="Could not delete appointment"
        onCloseError={onCloseError}
        />
        )}
      </article>
  )
}

export default Appointment