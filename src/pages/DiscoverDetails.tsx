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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ARTIST_TOP_TRACKS_QUERY_PARAMS = { market: "US" };

export default function DiscoverDetails(props: { artist: Artist }) {
  const { data: artistTopTracksData } = useSpotifyApi<{ tracks: Track[] }>(
    `/artists/${props.artist.id}/top-tracks`,
    ARTIST_TOP_TRACKS_QUERY_PARAMS
  );

  const [openedAlbums, setOpenedAlbums] = useState<Album[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  function handleAlbumClick(album: Album) {
    // if album is already opened, do nothing
    if (openedAlbums.find((a) => a.id === album.id)) return;

    setOpenedAlbums((openedAlbums) => {
      // Max of 5 open at a time.
      // auto close oldest tabs
      if (openedAlbums.length > 4) {
        openedAlbums = openedAlbums.slice(openedAlbums.length - 4);
      }
      // offset by 1 because top tracks tab is always open
      setActiveTab(openedAlbums.length + 1);
      return [...openedAlbums, album];
    });
  }

  function handleCloseAlbumTab(tabIndex: number) {
    setOpenedAlbums((openedAlbums) => {
      const res = openedAlbums.filter((_, i) => i !== tabIndex);
      // if the active tab is now out of bounds, reset it to the last opened tab
      if (activeTab > res.length) {
        setActiveTab(res.length);
      }
      return res;
    });
  }

  return (
    <StyledGridLayout>
      <div className="has-text-light">
        <TabbedContent onTabClick={(_, i) => setActiveTab(i)}>
          <Tab id="top-tracks" isActive={activeTab === 0}>
            <TabHeader>Top Tracks</TabHeader>

            <TabContent>
              {artistTopTracksData?.tracks ? (
                <TrackList tracks={artistTopTracksData.tracks} />
              ) : (
                <Loader />
              )}
            </TabContent>
          </Tab>

          {openedAlbums.map((album, i) => (
            /* isActive is offset by 1 because top tracks tab is always open */
            <Tab key={album.id} id={album.id} isActive={i + 1 === activeTab}>
              <TabHeader>
                {album.name}
                <StyledTabCloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseAlbumTab(i);
                  }}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </StyledTabCloseButton>
              </TabHeader>

              <TabContent>
                {/* <TrackList tracks={album.tracks} /> */}
                <span>{album.name} content</span>
              </TabContent>
            </Tab>
          ))}
        </TabbedContent>
      </div>

      {/* <pre>{JSON.stringify(relatedArtists, undefined, 2)}</pre> */}
      <DiscoverArtistDiscography
        artist={props.artist}
        onAlbumClick={handleAlbumClick}
      />
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

const StyledTabCloseButton = styled.button`
  cursor: pointer;
  margin-inline-start: 4px;
  border: none;
  background-color: unset;
  border-radius: 50%;
  padding: 0;

  svg {
    border-radius: 50%;
    transition: box-shadow 0.1s ease-out;
  }

  &:hover {
    svg {
      box-shadow: 0px 0px 4px 0px red;
    }
  }
`;
