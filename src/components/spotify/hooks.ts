import { useEffect, useState } from "react";
import { SpotifyError } from "../types";
import { spotify } from "./api";

export function useSpotifyApi<T>(endpoint: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<{ status: number, message: string }>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    spotify.get(endpoint, signal)
      .then((data: any) => {
        console.log(`bah data is: ${data}`);
        setData(data);
      }).catch((error: SpotifyError) => setError(error.error));

    return () => abortController.abort();
  }, [endpoint]);
  return {data, error};
}