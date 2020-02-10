import React from "react";
import "./styles.css";
import FileExplorer from "./components/FileExplorer/FileExplorer";

// App Component
//
function App() {
  console.log('App');

  return (
    <div className="App">
      <FileExplorer />
    </div>
  );
}

export default App;
