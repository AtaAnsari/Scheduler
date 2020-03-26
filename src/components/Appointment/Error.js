import React from "react"
// This is the view of the appointment is shown when there is an error while saving or deleting an appointment, likely as a result of a failed http request. 
const Error = function (props) {
  return(
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img 
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onCloseError}
      />
    </main>
  )
}

export default Error

