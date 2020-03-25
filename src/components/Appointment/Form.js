import React, {useState} from "react"
import InterviewerList from "../Interviewerlist/InterviewerList"
import Button from "../Daylist/Button"


const Form = function (props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.save(name, interviewer);
  }
  
  const reset = function() {
    setName("");
    setInterviewer(null)
  }
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
