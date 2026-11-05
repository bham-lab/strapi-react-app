import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("strapiFetch", () => {
  let strapiFetch: typeof import("./strapi").strapiFetch;
  let StrapiError: typeof import("./strapi-error").StrapiError;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();

    vi.stubEnv("STRAPI_URL", "http://localhost:1337");
    vi.stubEnv("STRAPI_API_TOKEN", "test-token");

    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const client = await import("./strapi");
    const errors = await import("./strapi-error");

    strapiFetch = client.strapiFetch;
    StrapiError = errors.StrapiError;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("converts a timeout into a StrapiError", async () => {
    fetchMock.mockRejectedValue(
      new DOMException("The operation timed out", "TimeoutError"),
    );

    const request = strapiFetch("/api/sectors");

    await expect(request).rejects.toBeInstanceOf(StrapiError);

    await expect(request).rejects.toMatchObject({
      status: null,
    });

    await expect(request).rejects.toHaveProperty(
      "message",
      "Strapi request timed out",
    );
  });

  it("preserves the HTTP status for a 404 response", async () => {
    fetchMock.mockResolvedValue(new Response("Not found", { status: 404 }));

    const request = strapiFetch("/api/sectors");

    await expect(request).rejects.toBeInstanceOf(StrapiError);

    await expect(request).rejects.toMatchObject({
      status: 404,
    });

    await expect(request).rejects.toHaveProperty(
      "message",
      "Strapi request failed with status 404.",
    );
  });

  it("rejects a full external URL before sending the token", async () => {
    await expect(
      strapiFetch("https://attacker.example/api/sectors"),
    ).rejects.toMatchObject({
      name: "StrapiError",
      status: null,
      message: expect.stringContaining("Blocked request"),
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
