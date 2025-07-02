import { IProduct, Product } from "@/models/Product";
import { Controller } from "./Controller";
import { Category } from "@/models/Category";
import { SubCategory } from "@/models/SubCategory";

class ProductService extends Controller<IProduct> {
  constructor() {
    super(Product);
  }
  async getPopullated() {
    new Category();
    new SubCategory();
    return await this.model.find().populate("category").populate("subCategory");
  }
}

export const productService = new ProductService();
