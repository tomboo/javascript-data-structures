import React from "react";
import { connect } from "react-redux";
// import {useImmerReducer } from "use-immer";

import styled from "styled-components";
import Tree from "./Tree";
import { stringify } from "../../utilities";
// import { _initialState, reducer } from "./store"



const StyledFileExplorer = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

// FileExplorer Component
//
function FileExplorer(props) {
  console.log('FileExplorer');
  console.log(props);

  //const initialState = _initialState();
  //const [state, dispatch] = useImmerReducer(reducer, initialState);

  // TODO: Research util.inspect()
  let nodeDetail = <div>no selection</div>;
  if (props.selectID) {
    nodeDetail = (
      <div>
        { props.nodes[props.selectID].toString() }
        {/* 
        <h2>Node Details</h2>
        {stringify(mock_data.items[selectedNode.id])}
        */}
      </div>
    );
  }

  // TODO: remove temporary
  nodeDetail = (
    <div>
      {stringify(props)}
    </div>
  );

  return (
    <StyledFileExplorer>
      {/* Left pane */}
      <div>
        <h3>Tree</h3>
        <hr />
          <TreeWrapper>
            <Tree />
          </TreeWrapper>
      </div>

      {/* Right pane */}
      <div>
        <h3>Node Info</h3>
        <hr />
        { nodeDetail }
      </div>
    </StyledFileExplorer>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    selectID: state.selectID,
    nodes: state.nodes,
  };
}
export default connect(mapStateToProps)(FileExplorer);