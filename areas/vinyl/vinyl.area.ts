import { Area } from "../../deps.ts";
import { VinylController } from "./vinyl.controller.ts";

@Area({
  baseRoute: "/api",
  controllers: [VinylController]
})
export class VinylArea {}
