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
  justify-content: center;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
`;

enum AnimationStep {
  DEFAULT = 0,
  LINE = 1,
  MOVE_LEFT = 2,
  EMBIGGEN1 = 3,
  EMBIGGEN2 = 4,

  LAST = 4,
}

const centeredAndBig = {
  center: {
    node: { active: false },
  },
  rightTop: {
    edge: { collapsed: true },
    node: { collapsed: true },
  },
  rightMiddle: {
    edge: { collapsed: true },
    node: { collapsed: false, moveLeft: true, active: true },
  },
  rightBottom: {
    edge: { collapsed: true },
    node: { collapsed: true },
  },
};

const AnimationStepMap = {
  [AnimationStep.DEFAULT]: {
    center: {
      node: { active: true },
    },
    rightTop: {
      edge: { collapsed: false },
      node: { collapsed: false },
    },
    rightMiddle: {
      edge: { collapsed: false },
      node: { collapsed: false, moveLeft: false, active: false },
    },
    rightBottom: {
      edge: { collapsed: false },
      node: { collapsed: false },
    },
  },

  [AnimationStep.LINE]: {
    center: {
      node: { active: false },
    },
    rightTop: {
      edge: { collapsed: true },
      node: { collapsed: true },
    },
    rightMiddle: {
      edge: { collapsed: false },
      node: { collapsed: false, moveLeft: false, active: false },
    },
    rightBottom: {
      edge: { collapsed: true },
      node: { collapsed: true },
    },
  },

  [AnimationStep.MOVE_LEFT]: {
    center: {
      node: { active: false },
    },
    rightTop: {
      edge: { collapsed: true },
      node: { collapsed: true },
    },
    rightMiddle: {
      edge: { collapsed: true },
      node: { collapsed: false, moveLeft: true, active: false },
    },
    rightBottom: {
      edge: { collapsed: true },
      node: { collapsed: true },
    },
  },

  [AnimationStep.EMBIGGEN1]: centeredAndBig,

  [AnimationStep.EMBIGGEN2]: centeredAndBig,
};

export const DiscoverPage = () => {
  const [animationStep, setAnimationStep] = useState<AnimationStep>(
    AnimationStep.DEFAULT
  );
  const updateAnimationStep = () => {
    setAnimationStep((currentStep: AnimationStep) => {
      return currentStep === AnimationStep.LAST
        ? AnimationStep.DEFAULT
        : currentStep + 1;
    });
  };
  const animationState = AnimationStepMap[animationStep];

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
            active={animationState.center.node.active}
            imageUrl="https://i.scdn.co/image/ab67616100005174e553e411f88e7d3935f5b48c"
          />
        </GridArea>

        <GridArea area="rightTop">
          <Edge
            length="33.33%"
            strokeWidth="4"
            direction="down-left"
            collapsed={animationState.rightTop.edge.collapsed}
          />
          <Node
            collapsed={animationState.rightTop.node.collapsed}
            imageUrl="https://i.scdn.co/image/ab67616100005174b6edcc3e5c79c2bb67a17d00"
          />
        </GridArea>

        <GridArea
          area="rightMiddle"
          onTransitionEnd={() =>
            animationStep !== AnimationStep.DEFAULT && updateAnimationStep()
          }
        >
          <Edge
            length="33.33%"
            strokeWidth="6"
            direction="left"
            collapsed={animationState.rightMiddle.edge.collapsed}
          />
          <Node
            imageUrl="https://i.scdn.co/image/ab676161000051746e13ca942e06bc70baf6f1a4"
            moveLeft={animationState.rightMiddle.node.moveLeft}
            active={animationState.rightMiddle.node.active}
            onClick={updateAnimationStep}
          />
        </GridArea>

        <GridArea area="rightBottom">
          <Edge
            length="33.33%"
            strokeWidth="4"
            direction="up-left"
            collapsed={animationState.rightBottom.edge.collapsed}
          />
          <Node
            collapsed={animationState.rightBottom.node.collapsed}
            imageUrl="https://i.scdn.co/image/ab67616100005174ff7c66df88410e55c67df046"
          />
        </GridArea>
      </Grid>
    </PageContent>
  );
};
