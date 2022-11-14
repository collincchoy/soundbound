import { Edge } from "components/Graph/Edge";
import Node from "components/Graph/Node";
import Loader from "components/Loader";
import PageContent from "components/PageContent";
import { TrackList } from "components/Track/List";
import React, { useMemo, useState } from "react";
import { useSpotifyApi } from "spotify/hooks";
import { Artist, Track } from "spotify/types";
import styled from "styled-components";

const ARTIST_TOP_TRACKS_QUERY_PARAMS = { market: "US" };

enum NodeSelection {
  Previous = -1,
  Top = 0,
  Middle = 1,
  Bottom = 2,
}

export const DiscoverPage = () => {
  const [selectedNode, setSelectedNode] = useState<NodeSelection | null>(null);
  const [collapseEdges, setCollapseEdges] = useState(false);
  const selectNode = (selection: NodeSelection) => {
    setCollapseEdges(true);
    setSelectedNode(selection);
  };
  const resetAnimationState = () => {
    if (relatedArtists && selectedNode != null) {
      if (previousArtist && selectedNode === NodeSelection.Previous) {
        setPreviousArtist(undefined);
        setArtistId(previousArtist.id);
      } else if (selectedNode !== NodeSelection.Previous) {
        setPreviousArtist(artist);
        setArtistId(relatedArtists[selectedNode].id);
      }
    }
    setCollapseEdges(false);
    setSelectedNode(null);
  };

  const [previousArtist, setPreviousArtist] = useState<Artist>();
  const [artistId, setArtistId] = useState("5cAtakaadWHJLxmGKrKcX7");
  const { data: artist } = useSpotifyApi<Artist>(`/artists/${artistId}`);

  const { data: relatedArtistsData } = useSpotifyApi<{ artists: Artist[] }>(
    `/artists/${artistId}/related-artists`
  );
  const [relatedArtistsCursor] = useState(0);
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
        <GridArea area="title">
          <h1 className="title is-size-3 has-text-centered">{artist?.name}</h1>
        </GridArea>

        <GridArea area="center">
          <Node imageUrl={artist && getLastImage(artist)} />
        </GridArea>

        <GridArea area="left" onAnimationEnd={resetAnimationState}>
          <Edge
            length="33.33%"
            strokeWidth="6"
            direction="right"
            collapsed={selectedNode === NodeSelection.Previous}
          />
          <Node
            imageUrl={previousArtist && getLastImage(previousArtist)}
            move={selectedNode === NodeSelection.Previous ? "right" : undefined}
            onClick={() => selectNode(NodeSelection.Previous)}
          />
        </GridArea>

        <GridArea area="rightTop" onAnimationEnd={resetAnimationState}>
          <Edge
            length="33.33%"
            strokeWidth="4"
            direction="down-left"
            collapsed={collapseEdges}
          />
          <Node
            collapsed={!!(selectedNode ?? selectedNode !== NodeSelection.Top)}
            imageUrl={
              relatedArtists && getLastImage(relatedArtists[NodeSelection.Top])
            }
            move={selectedNode === NodeSelection.Top ? "downLeft" : undefined}
            onClick={() => selectNode(NodeSelection.Top)}
          />
        </GridArea>

        <GridArea area="rightMiddle" onAnimationEnd={resetAnimationState}>
          <Edge
            length="33.33%"
            strokeWidth="6"
            direction="left"
            collapsed={collapseEdges}
          />
          <Node
            collapsed={
              !!(selectedNode ?? selectedNode !== NodeSelection.Middle)
            }
            imageUrl={
              relatedArtists &&
              getLastImage(relatedArtists[NodeSelection.Middle])
            }
            move={selectedNode === NodeSelection.Middle ? "left" : undefined}
            onClick={() => selectNode(NodeSelection.Middle)}
          />
        </GridArea>

        <GridArea area="rightBottom" onAnimationEnd={resetAnimationState}>
          <Edge
            length="33.33%"
            strokeWidth="4"
            direction="up-left"
            collapsed={collapseEdges}
          />
          <Node
            collapsed={
              !!(selectedNode ?? selectedNode !== NodeSelection.Bottom)
            }
            imageUrl={
              relatedArtists &&
              getLastImage(relatedArtists[NodeSelection.Bottom])
            }
            move={selectedNode === NodeSelection.Bottom ? "upLeft" : undefined}
            onClick={() => selectNode(NodeSelection.Bottom)}
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
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const BottomContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 400px;
  overflow-y: scroll;
`;
