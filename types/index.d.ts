type Logger = typeof import("roarr").default;

declare module Express {
  export interface Request extends SessionData {
    id?: string;
    logger: Logger;
  }
}
