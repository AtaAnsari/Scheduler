import React from "react"

const Empty = function (props) {
  return(
    <main className="appointment__add">
      <img
        data-cy="add"
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}

export default Empty