import React from "react";
// import values from "lodash/values";
import { stringify } from "./utilities"

let _nextID = 0;
function nextID() {
  ++_nextID;
  return _nextID.toString();
}

//
class Node {
  constructor(name) {
    this.id = nextID();
    this.name = name ? name : this.id;
  }
}

//
class Tree {
  constructor() {
    // datastore
    this.baseID = '';
    this.nodes = {};  // TODO: This could be implemented as array if you don't need to delete nodes
    this._addBase();
  };

  //
  _addBase() {
    const baseNode = new Node('base');
    this.baseID = baseNode.id;
    this.nodes[this.baseID] = baseNode;
  };

  //
  _getBase() {
    return this.nodes[this.baseID];
  };

  //
  toString() {
    return (
      <React.Fragment>
        { stringify(this) }
      </React.Fragment>
    );
  };

  //
  addRoot() {
    let child = this.addChild(this._getBase());
    child.name = 'root';    // TODO: not required
    child.isRoot = true;    // TODO: not required
    this.nodes[child.id] = child;
    return child;
  };

  //
  addChild(parent) {
    const child = new Node();
    this.nodes[child.id] = child;
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(child.id);
    return child;
  };

  //
  getRootNodes() {
    return this.getChildNodes(this._getBase());
  };

  /*
  // Get last root. Typicslly used if only one root.
  getRoot() {
    const n = this.getChildCount(this._getBase());
    if (n > 0) {
      return this.nodes[this.roots[n - 1]];
    }
    else {
      return null;
    }
  }
  */

  //
  getChildNodes(node) {
    if (this.isLeaf(node)) return [];
    return node.children.map(id => this.nodes[id]);
  };

  //
  isLeaf(node) {
    return ( this.getChildCount(node) === 0 );
  };

  //
  getChildCount(node) {
    if (node.children) {
      return node.children.length;
    }
    else {
      return 0;
    }
  };

  //
  getLabel(node) {
    return (node.name);
  };

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