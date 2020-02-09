import React from "react";
import "./styles.css";
// import Tree from "./tree";
import FileExplorer from "./components/FileExplorer/FileExplorer";

export default function App() {
  // const tree = testTree();

  return (
    <div className="App">
      <FileExplorer />

      {/*
      <h1>Tree</h1>
      { tree.toString() }
      */}
    </div>
  );
}


/*
function testTree() {
  let tree = new Tree();
  let root1;
  let root2;
  let parent;

  root1 = tree.addRoot();       // 1 (first root)

  parent = tree.addChild(root1); // 2
  tree.addChild(parent);        // 3
  
  parent = tree.addChild(root1); // 4
  tree.addChild(parent);        // 5
  tree.addChild(parent);        // 6

  root2 = tree.addRoot();       // 7 (second root)
  tree.addChild(root2);          // 8

  tree.preOrder(root1);

  return tree;
}
*/