import { useEffect, useState } from "react";
import { SpotifyError, PaginatedResponse } from "./types";
import { spotify } from "./api";

export function useSpotifyApi<T>(endpoint: string, params?: {}) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<{ status: number; message: string }>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    spotify
      .get<T>(endpoint, signal, params)
      .then((data) => {
        console.log(`bah data is: ${JSON.stringify(data)}`);
        setData(data);
      })
      .catch((error: SpotifyError) => {
        console.error(`ERR: ${JSON.stringify(error)}`);
        setError(error.error);
      });

    return () => abortController.abort();
  }, [endpoint, params]);
  return { data, error };
}

export function usePaginatedSpotifyApi<T>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [error, setError] = useState<{ status: number; message: string }>();
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    loadItems(endpoint, signal);
    return () => {
      abortController.abort();
    };
  }, [endpoint]);

  function loadItems(endpoint: string, abortSignal?: AbortSignal) {
    spotify
      .get<PaginatedResponse<T>>(endpoint, abortSignal)
      .then((resp) => {
        resp.items && setItems((prev) => [...prev, ...resp.items]);
        setNextPage(resp.next && resp.next.split("v1")[1]);
      })
      .catch((error: SpotifyError) => setError(error.error));
  }

  const loadMoreItems = (page: number) => {
    nextPage && loadItems(nextPage);
  };

  const reset = () => {
    setItems([]);
    setNextPage(null);
  };

  return { items, error, loadMoreItems, nextPage, reset };
}
