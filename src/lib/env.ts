import "server-only";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        "Add it to .env.local and restart the Next.js server.",
    );
  }
  return value;
}

function parseStrapiUrl(value: string): URL {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(
      "Invalid STRAPI_URL. Set it to a valid absolute URL, such as http://localhost:1337",
    );
  }

  if (
    (url.protocol !== "http:" && url.protocol !== "https:") ||
    url.username ||
    url.password
  ) {
    throw new Error(
      "STRAPI_URL must be use HTTP or HTTPS and must not contain credentials",
    );
  }

  return url;
}

const strapiBaseUrl = parseStrapiUrl(requiredEnv("STRAPI_URL"));
export const env = {
  STRAPI_URL: strapiBaseUrl.toString().replace(/\/+$/, ""),
  STRAPI_ORIGIN: strapiBaseUrl.origin,
  STRAPI_API_TOKEN: requiredEnv("STRAPI_API_TOKEN"),
};
