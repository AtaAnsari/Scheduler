import React from "react"
import Button from "../Daylist/Button"
// This is the view of the appointment that asks the user if they are sure about deleting an appointment.
const Confirm = function (props) {
  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancelConfirm} danger>Cancel</Button>
        <Button onClick={()=>{props.deleteIt(props.id)}} danger>Confirm</Button>
      </section>
    </main>

  )
}

export default Confirm