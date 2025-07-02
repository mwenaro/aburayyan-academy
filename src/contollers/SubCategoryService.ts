import { ISubCategory, SubCategory } from "@/models/SubCategory";
import { Controller } from "./Controller";
import { Category } from "@/models/Category";

class SubCategoryService extends Controller<ISubCategory> {
  constructor() {
    super(SubCategory);
  }
  async getPopullated() {
    new Category();
    new SubCategory();
    return await this.model.find().populate("category")
  }
}

export const subCategoryService = new SubCategoryService();
