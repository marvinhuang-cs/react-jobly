import React from "react";
import { render } from "@testing-library/react";
import Company from "./Company";

it("renders without crashing", function() {
    render(<Company />);
  });