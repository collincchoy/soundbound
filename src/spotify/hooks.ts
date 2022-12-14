import { useCallback, useEffect, useState } from "react";
import { SpotifyError, PaginatedResponse } from "./types";
import { spotify } from "./api";

export function useSpotifyApi<T>(endpoint: string, params?: {}) {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [error, setError] = useState<{ status: number; message: string }>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    setStatus("loading");
    spotify
      .get<T>(endpoint, signal, params)
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((error: SpotifyError) => {
        setError(error.error);
        setStatus("error");
      });

    return () => abortController.abort();
  }, [endpoint, params]);
  return { data, status, error };
}

export function usePaginatedSpotifyApi<T>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [error, setError] = useState<{ status: number; message: string }>();

  const loadItems = useCallback(
    (endpoint: string, abortSignal?: AbortSignal, append: boolean = true) => {
      spotify
        .get<PaginatedResponse<T>>(endpoint, abortSignal)
        .then((resp) => {
          resp.items &&
            setItems((prev) =>
              append ? [...prev, ...resp.items] : resp.items
            );
          setNextPage(resp.next && resp.next.split("v1")[1]);
        })
        .catch((error: SpotifyError) => setError(error.error));
    },
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    loadItems(endpoint, signal, false);
    return () => {
      abortController.abort();
    };
  }, [endpoint, loadItems]);

  const loadMoreItems = (page: number) => {
    nextPage && loadItems(nextPage, undefined, true);
  };

  const reset = () => {
    setItems([]);
    setNextPage(null);
  };

  return { items, error, loadMoreItems, nextPage, reset };
}
