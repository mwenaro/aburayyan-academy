import { dbCon } from "@/libs/mongoose/dbCon";
import { registeredModels } from "@/models";

export class BulkyInsertService {
  static async insert(tableName: string, data: any[]) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid data array");
    }

    await dbCon();

    // console.log("Available models:", Object.keys(registeredModels));

    const model = registeredModels[
      tableName as keyof typeof registeredModels
    ] as any;

    if (!model) {
      throw new Error(`Model '${tableName}' not found`);
    }

    try {
      const result = await model.insertMany(data, { ordered: false });
      return { success: true, insertedCount: result.length };
    } catch (error: any) {
      throw new Error(`Bulk insert failed: ${error.message}`);
    }
  }
}
