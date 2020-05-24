import { ServerRequest, ServerResponse } from "../deps.ts";

export interface MiddlewareTarget {
  onPreRequest(req: ServerRequest, res: ServerResponse): Promise<void>;
  onPostRequest(req: ServerRequest, res: ServerResponse): Promise<void>;
}
