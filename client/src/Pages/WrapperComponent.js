import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// import LiveChat from "./Components/LiveChat";
import LiveChat from "./Components/LiveChat";
const FullHeightPaper = styled(Paper)`
  // background: #fafafa; // light grey to give a paper-like feel
`;
const WrapperComponent = ({ children }) => {
  return (
    <div>
      {/* <h1>WrapperComponent</h1> */}
      <FullHeightPaper elevation={1}>
        {/*  */}
        {children}
        {/*  */}
      </FullHeightPaper>
      {/* <LiveChat /> */}
    </div>
  );
};

export default WrapperComponent;
