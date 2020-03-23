import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

