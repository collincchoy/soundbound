
export interface ha {
  boo?: boolean;
}

export interface SpotifyError {
  error: {
    status: number;
    message: string;
  }
}

export interface ResponseType {
}

export interface ArtistImage {
  height: number;
  url: string;
  width: number;
}

export interface ArtistResponse extends ResponseType {
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
  images: ArtistImage[];
  genres: string[];
  followers: {
    href?: string | null;
    total: number;
  }[];
  external_urls: any;
}

enum AlbumType {
  ALBUM = "ALBUM",
}

type Artist = {
  href: string,
  id: string,
  name: string,
  type: string,
  uri: string,
  external_urls?: {spotify: string},
}

type Album = {
  album_type: AlbumType,
  artists: Artist[],
  available_markets: string[],
  external_urls: any,
  href: string,
  id: string,
  images: {height: number, url: string, width: number}[],
  name: string,
  release_date: string,
  release_date_precision: string,
  total_tracks: number,
  type: "album",
  uri: string,
}

export type Track = {
  "album": Album,
  "artists": Artist[],
  "available_markets": string[],
  "disc_number": number,
  "duration_ms": number,
  "explicit": boolean,
  "external_ids": {}, //{"isrc": "GBAFL1900119"},
  "external_urls": {
    "spotify": string,
  },
  "href": string,
  "id": string,
  "is_local": boolean,
  "name": string,
  "popularity": number,
  "preview_url": string,
  "track_number": number,
  "type": "track",
  "uri": string,
}
