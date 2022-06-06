import { Edge } from "components/Graph/Edge";
import Node from "components/Graph/Node";
import PageContent from "components/PageContent";
import React, { useState } from "react";
import styled from "styled-components";

const Grid = styled.article`
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
  grid-template-areas:
    "left title rightTop"
    "left center rightMiddle"
    "left empty rightBottom";
  grid-gap: 1em 2em;

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
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export const DiscoverPage = () => {
  const [collapseEdges, setCollapseEdges] = useState(false);
  return (
    <PageContent>
      <Grid>
        <GridArea area="left">
          <Node />
        </GridArea>

        <GridArea area="title">
          <h1 className="title is-size-3">Tank & the Bangas</h1>
        </GridArea>

        <GridArea area="center">
          <Edge length="33.33%" strokeWidth="6" direction="left" />
          <Node
            active
            imageUrl="https://i.scdn.co/image/ab67616100005174e553e411f88e7d3935f5b48c"
          />
        </GridArea>

        <GridArea area="rightTop">
          <Edge
            length="33.33%"
            strokeWidth="4"
            direction="down-left"
            collapsed={collapseEdges}
          />
          <Node imageUrl="https://i.scdn.co/image/ab67616100005174b6edcc3e5c79c2bb67a17d00" />
        </GridArea>

        <GridArea
          area="rightMiddle"
          onClick={() => setCollapseEdges((current) => !current)}
        >
          <Edge
            length="33.33%"
            strokeWidth="6"
            direction="left"
            collapsed={collapseEdges}
          />
          <Node imageUrl="https://i.scdn.co/image/ab676161000051746e13ca942e06bc70baf6f1a4" />
        </GridArea>

        <GridArea area="rightBottom">
          <Edge
            length="33.33%"
            strokeWidth="4"
            direction="up-left"
            collapsed={collapseEdges}
          />
          <Node imageUrl="https://i.scdn.co/image/ab67616100005174ff7c66df88410e55c67df046" />
        </GridArea>
      </Grid>
    </PageContent>
  );
};
