import React from "react";
import "./styles.css";
import Tree from "./tree";

export default function App() {
  let tree = new Tree();
  tree.test();

  return (
    <div className="App">
      <h1>Tree</h1>
      { tree.toString() }
    </div>
  );
}
