import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, waitForElementToBeRemoved, wait } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
      fireEvent.click(getByText("Tuesday"))
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // ***** DO NOT REMOVE COMMENTED TEST. THIS TEST SOMEHOW HAS A SIDE EFFECT ON THE SUBSEQUENT ONE AND CAUSES IT TO FAIL. BUT EACH OF THE FOLLOWING TESTS DO WORK INDEPENDENTLY ****

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async() => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const dayList = getAllByTestId(container, "day");
    const monday = dayList.find(day => queryByText(day, "Monday"))
    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });

  // it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  //   const { container, debug } = render(<Application />);
  //   await waitForElement(() => getByText(container, "Archie Cohen"))
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0];
  //   fireEvent.click(getByAltText(appointment, "Add"));
  //   fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
  //   target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //   fireEvent.click(getByText(appointment, "Save"))
  //   await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  //   fireEvent.click(getByAltText(appointment, "Delete"));
  //   fireEvent.click(getByText(appointment, "Confirm"))
  //   await waitForElementToBeRemoved(() =>getByText(appointment, "Deleting"))
  //   await waitForElement(() => getByAltText(appointment, "Add"));
  //   const dayList = getAllByTestId(container, "day");
  //   const monday = dayList.find(day => queryByText(day, "Monday"))
  //   expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
  // });
  
  // it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  //   // 1. Render the Application.
  //   const { container, debug } = render(<Application />);
  //   await waitForElement(() => getByText(container, "Archie Cohen"))
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0];
  //   fireEvent.click(getByAltText(appointment, "Add"));
  //   fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
  //   target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //   fireEvent.click(getByText(appointment, "Save"))
  //   await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  //   fireEvent.click(getByAltText(appointment, "Delete"));
  //   fireEvent.click(getByText(appointment, "Confirm"))
  //   await waitForElementToBeRemoved(() =>getByText(appointment, "Deleting"))
  //   await waitForElement(() => getByAltText(appointment, "Add"));
  //   // console.log(prettyDOM(appointment));
  //   // const day = getAllByTestId(container, "day").find(day =>
  //   //   queryByText(day, "Monday")
  //   // );
  //   const dayList = getAllByTestId(container, "day");
  //   const monday = dayList.find(day => day = "Monday")
    
  //   expect(getByText(monday, "1 spots remaining")).toBeInTheDocument();
  // });
  

});




