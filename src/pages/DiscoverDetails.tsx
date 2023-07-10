import DiscoverArtistDiscography from "components/DiscoverArtistDiscography";
import Loader from "components/Loader";
import Tab from "components/Tab";
import TabHeader from "components/TabHeader";
import TabContent from "components/TabContent";
import TabbedContent from "components/TabbedContent";
import { TrackList } from "components/Track/List";
import React, { useState } from "react";
import { useSpotifyApi } from "spotify/hooks";
import { Album, Artist, PaginatedResponse, Track } from "spotify/types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { spotify } from "spotify/api";

const ARTIST_TOP_TRACKS_QUERY_PARAMS = { market: "US" };

export default function DiscoverDetails(props: { artist: Artist }) {
  const { data: artistTopTracksData } = useSpotifyApi<{ tracks: Track[] }>(
    `/artists/${props.artist.id}/top-tracks`,
    ARTIST_TOP_TRACKS_QUERY_PARAMS
  );

  const [openedAlbums, setOpenedAlbums] = useState<
    { album: Album; tracks?: Track[] }[]
  >([]);
  const [activeTab, setActiveTab] = useState(0);

  function handleAlbumClick(album: Album) {
    // if album is already opened, do nothing
    const alreadyOpenedAlbumIdx = openedAlbums.findIndex(
      (a) => a.album.id === album.id
    );
    if (alreadyOpenedAlbumIdx !== -1) {
      setActiveTab(alreadyOpenedAlbumIdx + 1);
      return;
    }

    // fetch the track list for the album
    spotify
      .get<PaginatedResponse<Track>>(`/albums/${album.id}/tracks`)
      .then((resp) => {
        setOpenedAlbums((openedAlbums) =>
          openedAlbums.map((openedAlbum) => {
            if (openedAlbum.album.id === album.id) {
              // resp.items[x] doesn't include the album metadata so let's append it here to satisfy downstream expectations
              resp.items.forEach((track) => (track.album = album));
              const tracks = resp.items;
              return { album, tracks };
            }
            return openedAlbum;
          })
        );
      });

    setOpenedAlbums((openedAlbums) => {
      // Max of 5 open at a time.
      // auto close oldest tabs
      if (openedAlbums.length > 4) {
        openedAlbums = openedAlbums.slice(openedAlbums.length - 4);
      }
      // offset by 1 because top tracks tab is always open
      setActiveTab(openedAlbums.length + 1);
      return [...openedAlbums, { album }];
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
    <StyledGridLayout className="has-text-light">
      <section>
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

          {openedAlbums.map(({ album, tracks }, i) => (
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
                {tracks ? <TrackList tracks={tracks} /> : <Loader />}
              </TabContent>
            </Tab>
          ))}
        </TabbedContent>
      </section>

      {/* <pre>{JSON.stringify(relatedArtists, undefined, 2)}</pre> */}
      <section>
        <DiscoverArtistDiscography
          artist={props.artist}
          onAlbumClick={handleAlbumClick}
        />
      </section>
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
  margin-inline-start: 6px;
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
