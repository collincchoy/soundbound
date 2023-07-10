import DiscoverArtistDiscography from "components/DiscoverArtistDiscography";
import Loader from "components/Loader";
import Tab from "components/Tab";
import TabHeader from "components/TabHeader";
import TabContent from "components/TabContent";
import TabbedContent from "components/TabbedContent";
import { TrackList } from "components/Track/List";
import React, { useState } from "react";
import { useSpotifyApi } from "spotify/hooks";
import { Album, Artist, Track } from "spotify/types";
import styled from "styled-components";

const ARTIST_TOP_TRACKS_QUERY_PARAMS = { market: "US" };

export default function DiscoverDetails(props: { artist: Artist }) {
  const { data: artistTopTracksData } = useSpotifyApi<{ tracks: Track[] }>(
    `/artists/${props.artist.id}/top-tracks`,
    ARTIST_TOP_TRACKS_QUERY_PARAMS
  );

  const [openedAlbums, setOpenedAlbums] = useState<Album[]>([]);

  const albumTabs = openedAlbums.map((album) => {
    return (
      <Tab key={album.id} id={album.id}>
        <TabHeader>{album.name}</TabHeader>

        <TabContent>
          {/* <TrackList tracks={album.tracks} /> */}
          <span>{album.name} content</span>
        </TabContent>
      </Tab>
    );
  });
  return (
    <StyledGridLayout>
      <div className="has-text-light">
        {/* <h3>Top Tracks</h3> */}
        <TabbedContent>
          <Tab id="top-tracks">
            <TabHeader>Top Tracks</TabHeader>

            <TabContent>
              {artistTopTracksData?.tracks ? (
                <TrackList tracks={artistTopTracksData.tracks} />
              ) : (
                <Loader />
              )}
            </TabContent>
          </Tab>

          {albumTabs}
        </TabbedContent>
      </div>

      {/* <pre>{JSON.stringify(relatedArtists, undefined, 2)}</pre> */}
      <DiscoverArtistDiscography artist={props.artist} />
    </StyledGridLayout>
  );
}

const StyledGridLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;
  /* grid-auto-rows: 1fr; */

  & > * {
    max-height: 400px;
    overflow-y: scroll;

    /* Foreground, Background */
    scrollbar-color: #999 #333;

    &::-webkit-scrollbar {
      width: 10px; /* Mostly for vertical scrollbars */
      height: 10px; /* Mostly for horizontal scrollbars */
    }
    &::-webkit-scrollbar-thumb {
      /* Foreground */
      background: #999;
    }
    &::-webkit-scrollbar-track {
      /* Background */
      background: #333;
    }
  }
`;
