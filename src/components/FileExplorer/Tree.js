import React from "react";
// import { useState } from "react";
// import values from "lodash/values";
import PropTypes from "prop-types";

import TreeNode from "./TreeNode";
// import { mock_data } from "./mock-data";

import treeView from "../../tree"
// import { stringify } from "../../utilities"
import {useImmer} from "use-immer";


// construct treeView
function buildView() {
  const view = new treeView();
  const root = view.addRoot();
  let parent;
  parent = view.addChild(root);
  view.addChild(parent);
  parent = view.addChild(root);
  view.addChild(parent);
  view.addChild(parent);
  // console.log('view', view);
  return view;
}

// Tree Component
function Tree(props) {
  // console.log('Tree');
  // console.log(props);
  // const [root, setRoot] = useState(null);
  const [view, setView] = useImmer(buildView());

  // callback
  function getChildNodes(node) {
    console.log('getChildNodes', node);
    
    return view.getChildNodes(node);
  }

  // callback
  function onNodeSelect (node) {
    console.log('onNodeSelect', node);
    
    const { onSelect } = props;
    onSelect(node);
  };

  // callback
  function onToggle(node) {
    console.log('onToggle', node.isOpen);

    setView(draft => {
      draft.nodes[node.id].isOpen = !node.isOpen;
    });
  }

  const rootNodes = view.getRootNodes();
  return (
    <div> 
      {rootNodes.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          getChildNodes={getChildNodes}
          onNodeSelect={onNodeSelect}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};

export default Tree;