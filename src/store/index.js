import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import produce from 'immer'
import { stringify } from "../utilities";

const CLEAR_LIST = "CLEAR_LIST";
const ADD_ROOT = "ADD_ROOT";
const ADD_CHILD = "ADD_CHILD";
const SELECT_NODE = "SELECT";
const TOGGLE_NODE = "TOGGLE";

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
  }

  //
  toString() {
    return stringify(this);
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

  let root = _addRoot(tree);
  root.isOpen = true;
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
  let root = _addChild(tree, _getBase(tree));
  root.name = "root"; // TODO: not required
  root.isRoot = true; // TODO: not required
  //tree.nodes[root.id] = root;
  tree.selectID = root.id;
  return root;
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
export function _getRootNodes(tree) {
  return _getChildNodes(tree, _getBase(tree));
}

//
export function _getChildNodes(tree, node) {
  if (node._isLeaf()) return [];
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

export function addChild(parentID) {
  return {
    type: ADD_CHILD,
    parentID
  };
}

export function selectNode(nodeID) {
  console.log('selectNode', nodeID);
  return {
    type: SELECT_NODE,
    nodeID
  };
}

export function toggleNode(nodeID) {
  console.log('toggleNode', nodeID);
  return {
    type: TOGGLE_NODE,
    nodeID
  };
}

//
// Reducers
//
const reducer = (state = _initialState(), action) => 
  produce(state, draft => {
    switch (action.type) {    
      case CLEAR_LIST:
        draft = _initialState();
        break;
      case ADD_ROOT:
        _addRoot(draft);
        break;
      case ADD_CHILD:
        _addChild(draft);
        break;
      case SELECT_NODE:
        // TODO: assert nodeID is a valid id
        // TODO: seems inefficient to copy entire tree to set selection
        // TODO: consider separate state for selectID
        draft.selectID = action.nodeID;
        break;
      case TOGGLE_NODE:
        console.log(draft.nodes[action.nodeID].isOpen);
        draft.nodes[action.nodeID].isOpen = !draft.nodes[action.nodeID].isOpen;
        draft.selectID = action.nodeID;
        console.log(draft.nodes[action.nodeID].isOpen);
        break;
      default:
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
