import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProtectedRoute />
      </header>
    </div>
  );
}

export default App;
