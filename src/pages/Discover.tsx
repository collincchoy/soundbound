import { Edge } from "components/Graph/Edge";
import Node from "components/Graph/Node";
import Loader from "components/Loader";
import PageContent from "components/PageContent";
import { TrackList } from "components/Track/List";
import React, { useMemo, useState } from "react";
import { useSpotifyApi } from "spotify/hooks";
import { Artist, Track } from "spotify/types";
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

const ARTIST_TOP_TRACKS_QUERY_PARAMS = { market: "US" };

export const DiscoverPage = () => {
  console.log("render");
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

  const artistId = "5cAtakaadWHJLxmGKrKcX7";
  const { data: artist } = useSpotifyApi<Artist>(`/artists/${artistId}`);

  const { data: relatedArtistsData } = useSpotifyApi<{ artists: Artist[] }>(
    `/artists/${artistId}/related-artists`
  );
  const [relatedArtistsCursor, setRelatedArtistsCursor] = useState(0);
  const relatedArtists = useMemo(
    () =>
      relatedArtistsData?.artists.slice(
        relatedArtistsCursor,
        relatedArtistsCursor + 3
      ),
    [relatedArtistsCursor, relatedArtistsData]
  );

  const getLastImage = (artist: Artist) =>
    artist.images[Math.floor(artist.images.length / 2)].url;

  const { data: artistTopTracksData } = useSpotifyApi<{ tracks: Track[] }>(
    `/artists/${artistId}/top-tracks`,
    ARTIST_TOP_TRACKS_QUERY_PARAMS
  );

  return (
    <PageContent>
      <Grid>
        <GridArea area="left">
          <Node />
        </GridArea>

        <GridArea area="title">
          <h1 className="title is-size-3 has-text-centered">{artist?.name}</h1>
        </GridArea>

        <GridArea area="center">
          <Edge length="33.33%" strokeWidth="6" direction="left" />
          <Node
            active={animationState.center.node.active}
            imageUrl={artist && getLastImage(artist)}
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
            imageUrl={relatedArtists && getLastImage(relatedArtists[0])}
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
            imageUrl={relatedArtists && getLastImage(relatedArtists[1])}
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
            imageUrl={relatedArtists && getLastImage(relatedArtists[2])}
          />
        </GridArea>
      </Grid>

      <BottomContainer>
        <div>
          {artistTopTracksData?.tracks ? (
            <TrackList tracks={artistTopTracksData.tracks} />
          ) : (
            <Loader />
          )}
        </div>

        <pre>{JSON.stringify(relatedArtists, undefined, 2)}</pre>
      </BottomContainer>
    </PageContent>
  );
};

const BottomContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 400px;
  overflow-y: scroll;
`;
