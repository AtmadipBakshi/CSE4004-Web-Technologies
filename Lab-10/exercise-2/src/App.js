import React, { useState } from "react";

function App() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Toggle Text</h1>

      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>

      {show && <p>This is some sample text!</p>}
    </div>
  );
}

export default App;