import { Middleware, ServerRequest, ServerResponse, colors } from "../deps.ts";
import { MiddlewareTarget } from "../models/middleware-target.ts";
import env from "../config/env.ts";
import { paddingLeft, formatClock } from "../utils/index.ts";

@Middleware(new RegExp("/api/"))
export class Log implements MiddlewareTarget {
  date = new Date();

  onPreRequest(req: ServerRequest, res: ServerResponse): Promise<void> {
    return new Promise(resolve => {
      this.date = new Date();

      if (env.denoEnv !== "prod") {
        console.log(paddingLeft({ maxLength: 50, char: "-" }));
      }
      
      resolve();
    });
  }

  onPostRequest({ url, method }: ServerRequest, res: ServerResponse): Promise<void> {
    return new Promise(resolve => {
      if (env.denoEnv !== "prod") {
        console.log(colors.gray(paddingLeft({
          text: formatClock(this.date),
          maxLength: 50
        }, "[TIME]")));

        console.log(colors.yellow(paddingLeft({
          text: url,
          maxLength: 50
        }, "[ENDPOINT]")));

        console.log(colors.magenta(paddingLeft({
          text: method,
          maxLength: 50
        }, "[VERB]")));

        const diff = new Date().getTime() - this.date.getTime();

        console.log(colors.cyan(paddingLeft({
          text: `${diff}ms`,
          maxLength: 50
        }, "[LATENCY]")));
      }

      resolve();
    });
  }
}
