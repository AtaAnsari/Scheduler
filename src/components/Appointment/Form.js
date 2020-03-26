import React, {useState} from "react"
import InterviewerList from "../Interviewerlist/InterviewerList"
import Button from "../Daylist/Button"
// This is the view of the appointment that allows the user to book an appointment or edit an existing appointment.

const Form = function (props) {
  // default state is set according to whether an existing form is being edited vs a new appointment being created.
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
// This function validates whether or not a name is entered by a user upon form submission. 
  function validate() {

  if (name === "") {
    setError("Student name cannot be blank");
    return;
  } else if (!interviewer) {
    setError("Interviewer must be selected");
    return;
  } else {
    setError("");
    props.save(name, interviewer);
  }
}
  const reset = function() {
    setName("");
    setInterviewer(null)
  }
  // Clears the name field and transitions to the correct mode when the user clicks cancel 
  const cancel = function() {
    reset(); props.onCancel()
  }
    return(
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
              value={name}
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              onChange={(e) => { setName(e.target.value); }}
              data-testid="student-name-input"
            />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button onClick={cancel} danger>Cancel</Button>
            <Button onClick={validate} confirm>Save</Button>
          </section>
        </section>
      </main>
    )
}

export default Form
