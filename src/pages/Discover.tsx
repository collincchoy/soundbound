import Node from "components/Graph/Node";
import PageContent from "components/PageContent";
import React from "react";
import styled from "styled-components";

const Grid = styled.article`
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
  grid-template-areas:
    "left title rightTop"
    "left center rightMiddle"
    "left empty rightBottom";
  align-items: center;
  justify-items: center;
  justify-content: center;
  width: 100%;
  height: 60vh;

  h1 {
    color: #f5f5f5;
  }
`;

const GridArea = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
  display: flex;
`;

export const DiscoverPage = () => {
  return (
    <PageContent>
      <Grid>
        <GridArea area="left">
          <Node />
        </GridArea>

        <GridArea area="title">
          <h1 className="title is-size-3 is-light">Tank & the Bangas</h1>
        </GridArea>

        <GridArea area="center">
          <Node />
        </GridArea>

        <GridArea area="rightTop">
          <Node />
        </GridArea>

        <GridArea area="rightMiddle">
          <Node />
        </GridArea>

        <GridArea area="rightBottom">
          <Node />
        </GridArea>
      </Grid>
    </PageContent>
  );
};
