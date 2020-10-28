import React from "react";
import { render } from "@testing-library/react";
import Companies from "./Companies";

it("renders without crashing", function() {
    render(<Companies />);
  });