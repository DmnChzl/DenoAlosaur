import { App, colors } from "./deps.ts";
import { appSettings } from "./settings.ts";
import env from "./config/env.ts";
import { displayDinosaur } from "./utils/index.ts";

const app = new App(appSettings);

app.listen(`${env.denoHost}:${env.denoPort}`);

console.log(colors.green(displayDinosaur(env.denoEnv === "prod")));
