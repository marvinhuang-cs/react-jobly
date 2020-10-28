import React from "react";
import { render } from "@testing-library/react";
import LogIn from "./LogIn";
import { MemoryRouter } from "react-router";

it("renders without crashing", function() {
    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
      );
  });