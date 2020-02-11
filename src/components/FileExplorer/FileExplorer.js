import React from "react";
import {useImmerReducer } from "use-immer";
import { _initialState, reducer } from "./store"

import { useState } from "react";
// import {useImmer} from "use-immer";
import styled from "styled-components";
import Tree from "./Tree";
// import { mock_data } from "./mock-data";
import { stringify } from "../../utilities";

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
function FileExplorer() {
  const [selectedNode, setSelectedNode] = useState(null);
  console.log('FileExplorer');
  console.log('selectedNode', selectedNode);
  const initialState = _initialState();
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  // callback
  function handleSelect(node) {
    console.log('handleSelect', node);
    setSelectedNode(node);
    console.log('selectedNode', selectedNode);
  }

  // TODO: Research util.inspect()
  let nodeDetail = <div>no selection</div>;
  if (selectedNode) {
    nodeDetail = (
      <div>
        {stringify(selectedNode)}
        {/* 
        <h2>Node Details</h2>
        {stringify(mock_data.items[selectedNode.id])}
        */}
      </div>
    );
  }

  nodeDetail = (
    <div>
      {stringify(state)}
    </div>
  );

  return (
    <StyledFileExplorer>
      {/* Left pane */}
      <div>
        <h3>Tree</h3>
        <hr />
          <TreeWrapper>
            <Tree onSelect={(node) => handleSelect(node)} />
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

export default FileExplorer;