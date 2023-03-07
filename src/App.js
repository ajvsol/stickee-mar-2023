import { sendPacks } from "./sendPacks.js";
import { useState } from "react";

function App() {
  const [input, setInput] = useState();

  function handleChange(event) {
    setInput(event.target.value);
  }

  return (
    <div className="App">
      <h1>Enter your widget order amount below:</h1>
      <input onChange={handleChange} placeholder="How many.." />
      {sendPacks(input).map((item, ind) => {
        return <p key={ind}>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
}

export default App;
