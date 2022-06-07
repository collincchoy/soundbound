import { renderHook } from "@testing-library/react-hooks";

import { useSpotifyApi } from "./hooks";

const mockSpotify = { get: jest.fn() };

jest.mock("./api", () => ({
  spotify: { get: () => mockSpotify.get() },
}));

describe("useSpotifyApi", () => {
  it("should update status appropriately on success", async () => {
    mockSpotify.get.mockResolvedValue(Promise.resolve({ message: "hello" }));

    const { result, waitFor } = renderHook(() =>
      useSpotifyApi<{ message: string }>("/v0/some/api")
    );

    expect(result.current.status).toEqual("loading");

    await waitFor(() => result.current.data?.message === "hello");
    expect(result.current.data).toEqual({ message: "hello" });
    expect(result.current.status).toEqual("success");
  });

  it("should update status appropriately on error", async () => {
    mockSpotify.get.mockRejectedValue({
      error: { status: 500, message: "some error" },
    });

    const { result, waitFor } = renderHook(() =>
      useSpotifyApi<{ message: string }>("/v0/some/api")
    );

    expect(result.current.status).toEqual("loading");

    await waitFor(() => result.current.error?.status === 500);

    expect(result.current.error).toEqual({
      status: 500,
      message: "some error",
    });
    expect(result.current.status).toEqual("error");
  });
});
