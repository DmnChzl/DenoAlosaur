import { readJson, Controller, Get, Post, Put, Delete, QueryParam, Param, Body, Content, InternalServerError, NotFoundError, BadRequestError } from "../../deps.ts";
import { Vinyl, VinylDocument } from "../../models/vinyl.ts";
import { VinylService } from "../../services/vinyl.service.ts";
import env from "../../config/env.ts";
import { formatDate, timestampToMillis, millisToMinutes } from "../../utils/index.ts";

@Controller("/vinyls")
export class VinylController {

  constructor(private service: VinylService) {
    this.initVinyls("vinyls.json");
  }

  /**
   * Initialize Vinyls DataSet
   *
   * @param {String} fileName JSON FileName
   */
  private async initVinyls(fileName: string) {
    const vinyls = await readJson(`${env.currentWorkingDir}/datasets/${fileName}`);

    (vinyls as Vinyl[]).forEach(async ({ title, ...vinyl }: Vinyl) => {
      const document: VinylDocument = await this.service.findVinylByTitle(title);
  
      if (document) {
        return await this.service.updateVinylByTitle(title, vinyl);
      }
  
      return await this.service.insertVinyl({ title, ...vinyl });
    });
  }

  @Get()
  async getAllVinyls(@QueryParam("artist") artist: string, @QueryParam("genre") genre: string) {
    try {
      let documents: VinylDocument[] = await this.service.findAllVinyls();

      if (artist) {
        documents = documents.filter(document => document.artist === artist);
      }

      if (genre) {
        documents = documents.filter(({ genres }) => genres.includes(genre));
      }

      return documents.map(({ _id: { "$oid": id }, released, tracklist, ...vinyl }) => {
        // NOTE: Set Released Date
        const releaseDate = new Date()
        releaseDate.setTime(timestampToMillis(released));

        // NOTE: Get Total Vinyl Length (Millis)
        const millis = tracklist.reduce((acc, { length }) => acc += length, 0);

        return {
          id,
          ...vinyl,
          releaseDate: formatDate(releaseDate),
          tracks: tracklist.length,
          length: millisToMinutes(millis)
        };
      });
    } catch (error) {
      console.log(error);
  
      throw new InternalServerError("Failure On 'findAllVinyls' !");
    }
  }

  @Get("/:id")
  async getVinyl(@Param("id") id: string) {
    try {
      const document: VinylDocument = await this.service.findVinylById(id);
  
      if (document) {
        const { _id: { "$oid": id }, released, ...vinyl } = document;
        let { tracklist } = document;

        // NOTE: Set Released Date
        const releaseDate = new Date()
        releaseDate.setTime(timestampToMillis(released));

        // NOTE: Get Total Vinyl Length (Millis)
        const millis = tracklist.reduce((acc, { length }) => acc += length, 0);

        // NOTE: Convert Each Track Lengh (Minutes)
        tracklist = tracklist.map(({ length, ...track }) => ({
          ...track,
          length: millisToMinutes(length)
        }));
  
        return {
          id,
          ...vinyl,
          releaseDate: formatDate(releaseDate),
          tracklist,
          length: millisToMinutes(millis)
        };
      }
        
      return new NotFoundError("Vinyl Not Found...");
    } catch (error) {
      console.log(error);
  
      throw new InternalServerError("Failure On 'findVinylById' !");
    }
  }

  @Post()
  async addVinyl(@Body() body: Vinyl) {
    try {
      if (Object.keys(body).length === 0) {
        return new BadRequestError("Body Is Empty...");
      }
  
      const { "$oid": id } = await this.service.insertVinyl(body);
  
      return Content({ createdId: id }, 201);
    } catch (error) {
      console.log(error);
  
      throw new InternalServerError("Failure On 'insertVinyl' !");
    }
  }

  @Put("/:id")
  async upVinyl(@Param("id") id: string, @Body() body: Partial<Vinyl>) {
    try {
      if (Object.keys(body).length === 0) {
        return new BadRequestError("Body Is Empty...");
      }
      
      const document: VinylDocument = await this.service.findVinylById(id);

      if (document) {
        const { _id: { "$oid": updatedId } } = document;
        const count = await this.service.updateVinylById(id, body);

        if (count) {
          return { updatedId };
        }
  
        return Content({ message: "Nothing Happened" }, 204);
      }

      return new NotFoundError("Vinyl Not Found..."); 
    } catch (error) {
      console.log(error);
  
      throw new InternalServerError("Failure On 'updateVinylById' !");
    }
  }

  @Delete("/:id")
  async delVinyl(@Param("id") id: string) {
    try {
      const document: VinylDocument = await this.service.findVinylById(id);
  
      if (document) {
        const { _id: { "$oid": deletedId } } = document;
        const count = await this.service.deleteVinylById(id);
  
        if (count) {
          return { deletedId };
        }
  
        return Content({ message: "Nothing Happened" }, 204);
      }
  
      return new NotFoundError("Vinyl Not Found...");
    } catch (error) {
      console.log(error);

      throw new InternalServerError("Failure On 'deleteVinylById' !");
    }
  }
}
