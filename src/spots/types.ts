
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