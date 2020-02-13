import React from "react";
import { connect } from "react-redux";
// import values from "lodash/values";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";
import { _getRootNodes, _getChildNodes } from "../../store";
import { selectNode, toggleNode } from "../../store";

// Tree Component
//
function Tree(props) {
  // const [view, setView] = useImmer(buildView());
  console.log("Tree");
  console.log(props);

  function renderNode(node, level, selected) {
    return (
      <TreeNode
        key={node.id}
        node={node}
        level={level}
        selected={selected}
        onSelect={() => props.selectNode(node.id)}
        onToggle={() => props.toggleNode(node.id)}
      />
    );
  }

  // Pre-order traversal. Call renderNode() for each node.
  function traverse(tree, node, level = 0) {
    return (
      <React.Fragment>
        {/* Render node */}
        {renderNode(node, level, node.id === tree.selectID)}

        {/* Render children (recursive call) */}
        {node.isOpen &&
          _getChildNodes(tree, node).map(childNode =>
            traverse(tree, childNode, level + 1)
          )}
      </React.Fragment>
    );
  }

  const rootNodes = _getRootNodes(props.state);
  return (
    <div>
      {rootNodes.map(node => traverse(props.state, node))}
    </div>
  );
}

/*
Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
*/

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => ({
  selectNode: id => dispatch(selectNode(id)),
  toggleNode: id => dispatch(toggleNode(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tree);
