import React, { useMemo } from "react";
import { usePaginatedSpotifyApi } from "spotify/hooks";
import { Album, AlbumType, Artist } from "spotify/types";
import styled from "styled-components";

type Props = {
  artist: Artist;
  onAlbumClick?: (album: Album) => void;
};

export default function DiscoverArtistDiscography({
  artist,
  onAlbumClick,
}: Props) {
  const { items: albums } = usePaginatedSpotifyApi<Album>(
    `/artists/${artist.id}/albums`
  );

  const [albumsTypeAlbum, albumsTypeSingle] = useMemo(() => {
    const [_albums, singles, others]: Album[][] = [[], [], []];
    albums?.forEach((album) => {
      if (album.album_type === AlbumType.Album) _albums.push(album);
      else if (album.album_type === AlbumType.Single) singles.push(album);
      else others.push(album);
    });
    return [_albums, singles, others];
  }, [albums]);

  const renderAlbumImages = (albums: Album[]) =>
    albums.map((album) => (
      <StyledHoverableAlbumCover
        data-popover-message={album.name}
        onClick={onAlbumClick && (() => onAlbumClick(album))}
        key={album.id}
      >
        <img
          src={album?.images[album?.images?.length - 1]?.url}
          title={album.name}
          alt={`Album cover for ${album.name}`}
          className="image is-64x64"
        />
      </StyledHoverableAlbumCover>
    ));

  return (
    <>
      <div>
        <h3>Albums</h3>
        {renderAlbumImages(albumsTypeAlbum)}
      </div>

      <div>
        <h3>Singles</h3>
        {renderAlbumImages(albumsTypeSingle)}
      </div>
    </>
  );
}

const StyledHoverableAlbumCover = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;

  &::after {
    // visibility
    display: none;

    // content
    content: attr(data-popover-message);
    width: max-content;
    background-color: black;
    border-radius: 5px;
    border: 1px solid white;
    padding: 0.5em;

    // positioning
    position: absolute;
    z-index: 100;
    top: 0;
    left: 50%;
    translate: -50% -100%;
  }

  &:hover {
    &::after {
      // visibility
      display: block;
    }
  }
`;
