import { Edge } from "components/Graph/Edge";
import Node from "components/Graph/Node";
import PageContent from "components/PageContent";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpotifyApi } from "spotify/hooks";
import { Artist } from "spotify/types";
import styled from "styled-components";
import DiscoverDetails from "./DiscoverDetails";

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
  const { artistId: pageId = "5cAtakaadWHJLxmGKrKcX7" } = useParams();
  const [artistId, setArtistId] = useState(pageId); // "5cAtakaadWHJLxmGKrKcX7");
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

  return (
    <PageContent>
      <Grid>
        <GridArea area="title">
          <h1 className="title is-size-3 has-text-centered">{artist?.name}</h1>
        </GridArea>

        <GridArea area="center">
          <Node
            imageUrl={artist && getLastImage(artist)}
            scaleTo={1.45}
            bubbleAnimation={selectedNode !== null}
            title={artist?.name}
          />
        </GridArea>

        <GridArea area="left" onAnimationEnd={resetAnimationState}>
          {previousArtist && (
            <>
              <Edge
                length="33.33%"
                strokeWidth="6"
                direction="right"
                collapsed={selectedNode === NodeSelection.Previous}
              />
              <Node
                imageUrl={getLastImage(previousArtist)}
                move={
                  selectedNode === NodeSelection.Previous ? "right" : undefined
                }
                onClick={() => selectNode(NodeSelection.Previous)}
                title={previousArtist.name}
              />
            </>
          )}
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
            title={relatedArtists && relatedArtists[NodeSelection.Top].name}
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
            title={relatedArtists && relatedArtists[NodeSelection.Middle].name}
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
            title={relatedArtists && relatedArtists[NodeSelection.Bottom].name}
          />
        </GridArea>

        <GridArea area="bottom">
          <GenreTags>
            {artist?.genres.map((genre) => (
              <span className="tag is-rounded is-dark" key={genre}>
                {genre}
              </span>
            ))}
          </GenreTags>
        </GridArea>
      </Grid>

      {artist && <DiscoverDetails artist={artist} />}
    </PageContent>
  );
};

const Grid = styled.article`
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
  grid-template-areas:
    "left title rightTop"
    "left center rightMiddle"
    "left bottom rightBottom";

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

const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: center;
`;
