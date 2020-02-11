import React, { useRef } from "react";
import { useImmerReducer } from "use-immer";

const ADD_ROOT = "ADD_ROOT";
const ADD_CHILD = "ADD_CHILD";
const SELECT_NODE = "SELECT";
const TOGGLE_NODE = "TOGGLE";
const GET_ROOT_NODES = "GET_ROOT_NODES";
const GET_CHILD_NODES = "GET_CHILD_NODES";

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

  //
  _isLeaf() {
    return this._getChildCount() === 0;
  }

  //
  _getChildCount() {
    if (this.children) {
      return this.children.length;
    } else {
      return 0;
    }
  }
}

//
export function _initialState() {
  const baseNode = new Node("base");

  const tree = {
    baseID: baseNode.id,
    selectID: baseNode.id,
    nodes: {
      [baseNode.id]: baseNode
    }
  };

  let root = _addRoot(tree);
  _addChild(tree, root);
  _addChild(tree, root);
  return tree;
}

//
function _getBase(tree) {
  return tree.nodes[tree.baseID];
}

//
function _addRoot(tree) {
  let child = _addChild(tree, _getBase(tree));
  child.name = "root"; // TODO: not required
  child.isRoot = true; // TODO: not required
  tree.nodes[child.id] = child;
  tree.selectID = child.id;
  return child;
}

//
function _addChild(tree, parentNode) {
  const child = new Node();
  tree.nodes[child.id] = child;
  if (!parentNode.children) {
    parentNode.children = [];
  }
  parentNode.children.push(child.id);
  return child;
}

//
function _getRootNodes(tree) {
  return tree._getChildNodes(tree._getBase());
}

//
function _getChildNodes(tree, node) {
  if (node._isLeaf()) return [];
  return node.children.map(id => tree.nodes[id]);
}

// Action Creators
//
function addRoot() {
  return {
    type: ADD_ROOT
  };
}

export function addChild(parentNode) {
  return {
    type: ADD_CHILD,
    parentNode
  };
}

function getChildNodes(node) {
  return {
    type: GET_CHILD_NODES,
    node
  };
}

function toggleNode(node) {
  return {
    type: TOGGLE_NODE,
    node
  };
}

function selectNode(node) {
  return {
    type: SELECT_NODE,
    node
  };
}

// Reducers
//
export const reducer = (draft, action) => {
  switch (action.type) {
    case ADD_ROOT:
      _addRoot(draft);
      return;
    /*
    case CLEAR_LIST:
      return _initialState();
*/
    default:
      return draft;
  }
};

/*
export default combineReducers({
  nodes,
  root,
  select,
})
*/
