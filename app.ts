import { App, colors } from "./deps.ts";
import { appSettings } from "./settings.ts";
import env from "./config/env.ts";
import { displayDinosaur } from "./utils/index.ts";

const app = new App(appSettings);

if (env.denoEnv !== "prod") {
  app.useStatic({
    root: `${env.currentWorkingDir}/www`,
    index: "index.html",
    baseRoute: "/api-docs/",
  });
}

app.listen(`${env.denoHost}:${env.denoPort}`);

console.log(colors.green(displayDinosaur(env.denoEnv === "prod")));
