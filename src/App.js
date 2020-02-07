import React from "react";
import "./styles.css";
import Tree from "./tree";

export default function App() {
  const tree = testTree();

  return (
    <div className="App">
      <h1>Tree</h1>
      { tree.toString() }
    </div>
  );
}



function testTree() {
  let tree = new Tree();
  let root;
  let parent;

  root = tree.addChild();       // 1
  tree.addChild(root);          // 2

  parent = tree.addChild(root); // 3
  tree.addChild(parent);        // 4
  tree.addChild(parent);        // 5

  root = tree.addChild();       // 7
  tree.addChild(root);          // 8

  console.log(tree.getRootNodes());
  console.log(tree.getChildNodes(parent));

  return tree;
}