import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FullsizeLoader = ({ text }: { text?: string }) => {
  return (
    <StyledContainer>
      <Loader />
      {text ?? ""}
    </StyledContainer>
  );
};

export default FullsizeLoader;
