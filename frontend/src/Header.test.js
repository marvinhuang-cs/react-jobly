import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

it("renders without crashing", function() {
    render(<Header />);
  });