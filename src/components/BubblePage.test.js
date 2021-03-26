import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import Login from './Login'
import userEvent from "@testing-library/user-event";

const user = 'Lambda School';
const pass = 'i<3Lambd4';

const testColors = [{
  color: "aliceblue",
  code: {
    hex: "#f0f8ff",
  },
  id: 1,
},
{
  color: "limegreen",
  code: {
    hex: "#99ddbc",
  },
  id: 2,
}]

test("Renders BubblePage without errors", () => {
  // Finish this test
  const {rerender} =render(<BubblePage testColors={testColors}/>)
  render(<Login/>)

  const tokenbtn = screen.queryByText(/Gain Ultra High Level Bubble Clearance/i)
  userEvent.click(tokenbtn)
  rerender(<BubblePage testColors={testColors}/>)
 
});

test("Fetches data and renders the bubbles on mounting", async () => {
  // Finish this test
  render(<BubblePage testColors={testColors}/>)
  const bubbles = screen.queryByText(/bubbles/i)
  expect(bubbles).toBeInTheDocument();
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading