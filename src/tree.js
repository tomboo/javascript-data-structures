import React from "react";
import values from "lodash/values";

let _nextID = 0;
function nextID() {
  ++_nextID;
  return _nextID.toString();
}

class Node {
  constructor(name) {
    this.gid = nextID();
    this.name = name ? name : this.gid;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.datastore = {};
  }

  toString() {
    return (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
        { JSON.stringify(this.datastore, null, "\t") }
      </div>    
    );
  }

  addChild(parent=null) {
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

  getRootNodes() {
    return values(this.datastore).filter(node => node.isRoot === true);
  };

  getChildNodes(node) {
    if (!node.children) return [];
    return node.children.map(gid => this.datastore[gid]);
  };
}

export default Tree;