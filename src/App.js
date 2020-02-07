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

  parent = tree.addChild(root); // 2
  tree.addChild(parent);        // 3

  parent = tree.addChild(root); // 4
  tree.addChild(parent);        // 5
  tree.addChild(parent);        // 6

  root = tree.addChild();       // 7
  tree.addChild(root);          // 8

  const roots = tree.getRootNodes();
  root = roots[0];
  tree.preOrder(root);

  return tree;
}