import React from "react"
// This is the view of the appointment is shown for a booked appointment, this view gives the user the ability to edit or delete a given appointment. 
const Show = function (props) {
  return(
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewDetails.interviewerName}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onConfirm}
          />
        </section>
      </section>
    </main>

  )
}

export default Show