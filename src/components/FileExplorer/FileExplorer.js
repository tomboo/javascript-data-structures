import React from "react";
import { connect } from "react-redux";
import Tree from "./Tree";
import styled from "styled-components";


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

  // TODO: Research util.inspect()
  let nodeDetail = <div>no selection</div>;
  if (props.selectID) {
    nodeDetail = (
      <div>
        { props.nodes[props.selectID].toString() }
      </div>
    );
  }

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
        <h3>Node</h3>
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