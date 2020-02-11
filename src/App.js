import React from "react";
import "./styles.css";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from "./components/FileExplorer/store"

// App Component
//
function App() {
  console.log('App');
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <div className="App">
        <FileExplorer />
      </div>
    </Provider>
  );
}

export default App;
