import "server-only";
import { env } from "./env";

import { StrapiError } from "./strapi-error";

export { StrapiError } from "./strapi-error";

export async function strapiFetch<T>(path: string): Promise<T> {
  let url: URL;
  try {
    url = new URL(path, `${env.STRAPI_URL}/`);
  } catch {
    throw new StrapiError(0, path, "Invalid Strapi request URL.");
  }

  if (url.origin !== env.STRAPI_ORIGIN) {
    throw new StrapiError(
      null,
      url.toString(),
      "Blocked request: URL host does not match the configured Strapi host.",
    );
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      },
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new StrapiError(null, url.toString(), "Strapi request timed out");
    }

    throw new StrapiError(
      null,
      url.toString(),
      err instanceof Error
        ? `Could not reach Strapi: ${err.message}`
        : "Could not reach strapi",
    );
  }
  if (!response.ok) {
    throw new StrapiError(
      response.status,
      url.toString(),
      `Strapi request failed with status ${response.status}.`,
    );
  }
  try {
    return (await response.json()) as T;
  } catch {
    throw new StrapiError(
      response.status,
      url.toString(),
      "Strapi returned and invalid or unreadable JSON response",
    );
  }
}
