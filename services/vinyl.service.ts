import { Injectable, Collection } from "../deps.ts";
import { Vinyl, VinylDocument } from "../models/vinyl.ts";
import db from "../config/db.ts";

interface ObjectID {
  $oid: string;
}

@Injectable()
export class VinylService {
  private collection: Collection;

  constructor() {
    const database = db.getDatabase;
    this.collection = database.collection("vinyl");
  }

  async findAllVinyls(): Promise<VinylDocument[]> {
    return await this.collection.find();
  }

  async findVinylById(id: string): Promise<VinylDocument> {
    return await this.collection.findOne({ _id: { "$oid": id } });
  }

  async findVinylByTitle(title: string): Promise<VinylDocument> {
    return await this.collection.findOne({ title });
  }

  async insertVinyl(vinyl: Vinyl): Promise<ObjectID> {
    return await this.collection.insertOne(vinyl);
  }
  
  async updateVinylById(id: string, vinyl: Partial<Vinyl>): Promise<number> {
    const { modifiedCount } = await this.collection.updateOne({ _id: { "$oid": id } }, { $set: vinyl });

    return modifiedCount;
  }
  
  async updateVinylByTitle(title: string, vinyl: Partial<Vinyl>): Promise<number> {
    const { modifiedCount } = await this.collection.updateOne({ title }, { $set: vinyl });

    return modifiedCount;
  }
  
  async deleteVinylById(id: string): Promise<number> {
    const deleteCount = await this.collection.deleteOne({ _id: { "$oid": id } });

    return deleteCount;
  }
}
