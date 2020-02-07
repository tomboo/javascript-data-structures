import React from "react";
import values from "lodash/values";

let _nextID = 0;
function nextID() {
  ++_nextID;
  return _nextID.toString();
}

//
class Node {
  constructor(name) {
    this.gid = nextID();
    this.name = name ? name : this.gid;
    this.children = [];
  }
}

//
class Tree {
  constructor() {
    this.datastore = {};
  }

  //
  toString() {
    return (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
        { JSON.stringify(this.datastore, null, "\t") }
      </div>    
    );
  }

  //
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

  //
  getRootNodes() {
    return values(this.datastore).filter(node => node.isRoot === true);
  };

  //
  getChildNodes(node) {
    if (this.isLeaf(node)) return [];
    return node.children.map(gid => this.datastore[gid]);
  };

  //
  getLabel(node) {
    return (node.name);
  };

  //
  isLeaf(node) {
    return (!node.children || node.children.length === 0);
  }

  //
  preOrder(node, level=0) {
    if (node !== null) {
      console.log(level, this.getLabel(node));

      ++level;
      let childNodes = this.getChildNodes(node);
      for (let i = 0; i < childNodes.length; i++) {
        this.preOrder(childNodes[i], level);
      }
    }
  }
}

export default Tree;