import React from "react";
import { connect } from "react-redux";

// import {useImmer} from "use-immer";
// import { useState } from "react";
// import values from "lodash/values";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";
//import treeView from "../../tree"
// import { stringify } from "../../utilities"
import { _getRootNodes, _getChildNodes } from "./store";
import { selectNode, toggleNode } from "./store";

// Tree Component
//
function Tree(props) {
  // const [view, setView] = useImmer(buildView());
  console.log("Tree");
  console.log("props", props);
  // console.log('view', view);

  function renderNode(node, level) {
    return (
      <TreeNode
        key={node.id}
        node={node}
        level={level}
        onSelect={props.selectNode(node.id)}
        onToggle={props.toggleNode(node)}
      />
    );
  }

  function traverse(tree, node, level = 0) {
    return (
      <div>
        {renderNode(node, level)}
        {node.isOpen &&
          _getChildNodes(tree, node).map(childNode =>
            traverse(tree, childNode, level + 1)
          )}
      </div>
    );
  }

  const rootNodes = _getRootNodes(props.state);
  return <div>{rootNodes.map(node => traverse(props.state, node))}</div>;
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  state: state // getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
  selectNode: id => dispatch(selectNode(id)),
  toggleNode: id => dispatch(toggleNode(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tree);
