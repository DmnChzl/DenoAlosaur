import { AppSettings } from "./deps.ts";
import { UserArea } from "./areas/user/user.area.ts";
import { VinylArea } from "./areas/vinyl/vinyl.area.ts";
import { Log } from "./middlewares/log.middleware.ts";

export const appSettings: AppSettings = {
  areas: [UserArea, VinylArea],
  middlewares: [Log],
  logging: false
};
