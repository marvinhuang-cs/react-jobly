import React from "react";
import { render } from "@testing-library/react";
import CardList from "./CardList";

it("renders without crashing", function() {
    render(<CardList />);
  });