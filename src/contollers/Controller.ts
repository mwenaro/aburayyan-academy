import { Model, Document } from "mongoose";
import { dbCon } from "@/libs/mongoose/dbCon";

export class Controller<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    dbCon(); // Ensure the DB connection is established
    this.model = model;
    
    // this.loadDB();
  }
  async loadDB() {
    await dbCon();
  }
  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);

    await dbCon();
    return await document.save();
  }

  async createMany(data: Partial<T>[]): Promise<any[]> {
    await dbCon();
    return await this.model.insertMany(data);
  }

  async getById(id: string): Promise<T | null> {
    await dbCon();
    return await this.model.findById(id).exec();
  }

  async getAll(): Promise<T[]> {
    await dbCon();
    return await this.model.find().exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    await dbCon();
    return await this.model.findByIdAndDelete(id).exec();
  }
}
