export class StrapiError extends Error {
  readonly status: number | null;
  readonly url: string;

  constructor(status: number | null, url: string, message: string) {
    super(message);
    this.name = "StrapiError";
    this.status = status;
    this.url = url;
  }
}
