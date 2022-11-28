import React, { useMemo } from "react";
import { usePaginatedSpotifyApi } from "spotify/hooks";
import { Album, AlbumType, Artist } from "spotify/types";

export default function DiscoverArtistDiscography({
  artist,
}: {
  artist: Artist;
}) {
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

  const renderAlbumImages = (albums: Album[]) => {
    return albums.map((album) => (
      <img
        src={album?.images[album?.images?.length - 1]?.url}
        alt="Album Cover"
        title={album.name}
        key={album.id}
      />
    ));
  };

  return (
    <div className="has-text-light">
      <div>
        <h3>Albums</h3>
        {renderAlbumImages(albumsTypeAlbum)}
      </div>

      <div>
        <h3>Singles</h3>
        {renderAlbumImages(albumsTypeSingle)}
      </div>
    </div>
  );
}
