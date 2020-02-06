import React from "react";
import values from "lodash/values";

let _nextID = 0;
function nextID() {
  ++_nextID;
  return _nextID.toString();
}

function Node(name) {
  this.gid = nextID();
  this.name = name ? name : this.gid;
  this.children = [];
}

function Tree() {
  this.datastore = {};
  this.toString = toString;
  this.addChild = addChild;
  this.getRootNodes = getRootNodes;
  this.getChildNodes = getChildNodes;
  this.test = test;
}

function toString() {
  return (
    <div style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
      { JSON.stringify(this.datastore, null, "\t") }
    </div>    
  );
}

function addChild(parent=null) {
  const child = new Node();
  this.datastore[child.gid] = child;
  if (!parent) {    // addRoot
    child.isRoot = true;
  }
  else {
    parent.children.push(child.gid);
  }
  return child;
}

function getRootNodes() {
  return values(this.datastore).filter(node => node.isRoot === true);
};

function getChildNodes(node) {
  if (!node.children) return [];
  return node.children.map(gid => this.datastore[gid]);
};


function test() {
  let root;
  let parent;

  root = this.addChild();       // 1
  this.addChild(root);          // 2

  parent = this.addChild(root); // 3
  this.addChild(parent);        // 4
  this.addChild(parent);        // 5

  root = this.addChild();       // 7
  this.addChild(root);          // 8

  console.log(this.getRootNodes());
  console.log(this.getChildNodes(parent));
}

export default Tree;