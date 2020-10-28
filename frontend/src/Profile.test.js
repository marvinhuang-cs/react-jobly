import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";

it("renders without crashing", function() {
    render(<Profile />);
  });