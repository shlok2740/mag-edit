import React, { useState } from "react";
import Home from "./Home";
import LandingPage from "./LandingPage";

function App() {
  const [isEditorActive, setIsEditorActive] = useState(false);

  return (
    <>
      {isEditorActive ? (
        <Home />
      ) : (
        <LandingPage onStart={() => setIsEditorActive(true)} />
      )}
    </>
  );
}

export default App;
