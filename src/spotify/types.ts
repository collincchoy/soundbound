export interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number; // 50,
  limit: number; // 20,
  offset: number; // 0,
  previous: null | string;
  href: string; // "https://api.spotify.com/v1/me/top/artists",
  next: string | null; // "https://api.spotify.com/v1/me/top/artists?limit=20&offset=20"
}

export interface Profile {
  country: string; // US
  display_name: string; // Collin Choy
  email: string;
  explicit_content: {
    filter_enabled: boolean; // false
    filter_locked: boolean; // false
  };
  external_urls: {
    spotify: string; // "https://open.spotify.com/user/1295067065"
  };
  followers: {
    href: null | string;
    total: number;
  };
  href: string; // "https://api.spotify.com/v1/users/1295067065"
  id: number;
  images: {
    height: number | null;
    url: string;
    width: number | null;
  }[];
  product: string; //"premium",
  type: string; // "user",
  uri: string; // "spotify:user:1295067065"
}

export interface ArtistImage {
  height: number;
  url: string;
  width: number;
}

export enum AlbumType {
  Album = "album",
  Single = "single",
}

export type SearchArtistResults = {
  artists: {
    href: string;
    items: Artist[];
  };
};

export type Artist = {
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
  external_urls: { spotify: string };
};

export type Album = {
  album_type: AlbumType;
  artists: Artist[];
  available_markets: string[];
  external_urls: any;
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
};

export type SearchTrackResults = {
  tracks: {
    href: string;
    items?: Track[];
  };
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {}; //{"isrc": "GBAFL1900119"},
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
};

export enum PersonalizationTimeRange {
  "1 month" = "short_term",
  "6 months" = "medium_term",
  "1+ years" = "long_term",
}

export type Recommendations = {
  tracks: Track[];
  seeds: {
    initialPoolSize: number; // 250;
    afterFilteringSize: number; // 250;
    afterRelinkingSize: number; // 250;
    id: string; // "4tZwfgrHOc3mvqYlEYSvVi";
    type: string; // "ARTIST";
    href: string; // "https://api.spotify.com/v1/artists/4tZwfgrHOc3mvqYlEYSvVi";
  }[];
};

export type RecommendationsQuery = {
  seed_artists?: string;
  seed_tracks?: string;
  seed_genres?: string;
};
