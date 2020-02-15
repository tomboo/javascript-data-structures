import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import produce from 'immer'
import { stringify } from "../utilities";
import values from "lodash/values";

const ADD_ROOT = "ADD_ROOT";
const ADD_CHILD = "ADD_CHILD";
const SELECT_NODE = "SELECT_NODE";
const TOGGLE_NODE = "TOGGLE_NODE";
const EXPAND_LIST = "EXPAND_LIST";
const COLLAPSE_LIST = "COLLAPSE_LIST";
const CLEAR_LIST = "CLEAR_LIST";


// ID generator
let _nextID = 0;
function nextID() {
  ++_nextID;
  return _nextID.toString();
}


// Node Class
class Node {
  constructor(name) {
    this.id = nextID();
    this.name = name ? name : this.id;
    this._isOpen = false;
  }

  toString() {
    return stringify(this);
  }

  getChildCount() {
    if (this.children) {
      return this.children.length;
    }
    else {
      return 0;
    }
  }

  isLeaf() {
    return this.getChildCount() === 0;
  }

  isOpen() {
    return this._isOpen;
  }

  open() {
    this._isOpen = true;
  }

  close() {
    this._isOpen = false;
  }

  toggle() {
    this._isOpen = !this._isOpen;
  }
}


// Tree Class
export function _initialState() {
  const baseNode = new Node("base");
  const tree = {
    baseID: baseNode.id,
    selectID: baseNode.id,
    nodes: {
      [baseNode.id]: baseNode
    }
  };
  return tree;
}

//
function _getBase(tree) {
  return tree.nodes[tree.baseID];
}

//
function _addRoot(tree) {
  return _addChild(tree, _getBase(tree));
}

//
function _addChild(tree, node) {
  const child = new Node();
  tree.nodes[child.id] = child;
  if (!node.children) {
    node.children = [];
  }
  node.children.push(child.id);
  return child;
}

//
function _select(tree, nodeID) {
  tree.selectID = nodeID;
}

function _open(tree, nodeID) {
  tree.nodes[nodeID].open();
}

function _close(tree, nodeID) {
  tree.nodes[nodeID].close();
}

function _toggle(tree, nodeID) {
  tree.nodes[nodeID].toggle();
}

// Selectors
export function getRootNodes(tree) {
  return getChildNodes(tree, _getBase(tree));
}

//
export function getChildNodes(tree, node) {
  if (node.isLeaf()) return [];
  return node.children.map(id => tree.nodes[id]);
}


//
// Action Creators
//
export function addRoot() {
  return {
    type: ADD_ROOT
  };
}

export function addChild(nodeID) {
  return {
    type: ADD_CHILD,
    nodeID
  };
}

export function selectNode(nodeID) {
  return {
    type: SELECT_NODE,
    nodeID
  };
}

export function toggleNode(nodeID) {
  return {
    type: TOGGLE_NODE,
    nodeID
  };
}

export function expandList() {
  return {
    type: EXPAND_LIST
  };
}

export function collapseList() {
  return {
    type: COLLAPSE_LIST
  };
}

export function clearList() {
  return {
    type: CLEAR_LIST
  };
}


//
// Reducers
//
const reducer = (state = _initialState(), action) => 
  produce(state, draft => {
    switch (action.type) {    
      case ADD_ROOT:
        const root = _addRoot(draft);
        _select(draft, root.id);
        break;
      case ADD_CHILD:
        _addChild(draft, draft.nodes[action.nodeID]);
        _open(draft, action.nodeID);
        _select(draft, action.nodeID);
        break;
      case SELECT_NODE:
        // TODO: assert nodeID is a valid id
        // TODO: seems inefficient to copy entire tree to set selection
        // TODO: consider separate state for selectID
        _select(draft, action.nodeID);
        break;
      case TOGGLE_NODE:
        _toggle(draft, action.nodeID);
        _select(draft, action.nodeID);
        break;
      case EXPAND_LIST:
        values(draft.nodes).map(node => _open(draft, node.id));
        break;
      case COLLAPSE_LIST:
        values(draft.nodes).map(node => _close(draft, node.id));
        _select(draft, _getBase(draft).id);
        break;
      case CLEAR_LIST:
      default:
        draft = _initialState();
        break;
    }
    return draft;
  }
)

//
// Store
//
export function generateStore() {
  const middleware = [ thunk ];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  return createStore(
    reducer,
    applyMiddleware(...middleware),
  ); 
}
