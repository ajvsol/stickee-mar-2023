import { sendPacks } from "./sendPacks.js";
import { useState } from "react";
function App() {
  const [input, setInput] = useState();
  const [packSize, setPackSize] = useState([5000, 2000, 1000, 500, 250]);

  function handleInput(event) {
    setInput(event.target.value);
  }

  const options = [
    {
      value: "5000, 2000, 1000, 500, 250",
      label: "[5000, 2000, 1000, 500, 250]",
    },
    {
      value: "1000, 900, 800, 700, 600, 500, 400, 300, 200, 100",
      label: "[1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]",
    },
    {
      value: "3000, 1500, 800, 400",
      label: "[3000, 1500, 800, 400]",
    },
  ];

  //value: [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100],
  //label: "[1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]",

  function handleDropdown(event) {
    setPackSize(event.target.value);
  }

  return (
    <div className="App">
      <h1>Enter your widget order amount below:</h1>
      <input onChange={handleInput} placeholder="How many.." />
      <p>{JSON.stringify(sendPacks(input, packSize))}</p>
      <label htmlFor="dropdown">Select your pack sizes: </label>
      <select id="dropdown" value={packSize} onChange={handleDropdown}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
