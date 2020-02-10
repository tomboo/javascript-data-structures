import React from "react";
import {useImmer} from "use-immer";
// import { useState } from "react";
// import values from "lodash/values";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";
import treeView from "../../tree"
// import { stringify } from "../../utilities"


// construct treeView
function buildView() {
  const view = new treeView();
  const root = view.addRoot();  // 2  (root)
  root.isOpen = true;
  // let parent;
  view.addChild(root);          // 3
  view.addChild(root);          // 4
  // view.addChild(parent);
  // parent = view.addChild(root);
  // view.addChild(parent);
  // view.addChild(parent);
  // console.log('view', view);
  return view;
}

// Tree Component
//
function Tree(props) {
  const [view, setView] = useImmer(buildView());
  console.log('Tree');
  console.log('props', props);
  console.log('view', view);

  // callback
  function getChildNodes(node) {
    console.log('getChildNodes', node);   
    return view.getChildNodes(node);
  }

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
          onSelect={() => props.onSelect(node)}
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