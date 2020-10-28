import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";

it("renders without crashing", function() {
    render(<JobCard />);
  });