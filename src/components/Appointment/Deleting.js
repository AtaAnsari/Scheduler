import React from "react"
// This is the view of the appointment is shown while the appointment is asynchronously deleted. 
const Status = function (props) {
  return(
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">Deleting</h1>
    </main>
  )
}

export default Status

