import React from "react";
import "./styles.css";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import { Provider } from 'react-redux'
import { generateStore } from "./components/FileExplorer/store"

// App Component
//
function App() {
  console.log('App');
  const store = generateStore();
  console.log(store);
  console.log(store.getState());
  
  return (
    <Provider store={store}>
      <div className="App">
        <FileExplorer />
      </div>
    </Provider>
  );
}

export default App;
