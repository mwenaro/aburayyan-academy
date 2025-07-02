import { Schema, model, models, Document } from "mongoose";
import { SubCategory } from "./SubCategory";
import { Product } from "./Product";

// Define an interface for the Category document
export interface ICategory extends Document {
  name: string;
  company?: string;
  active: boolean;
}

// Define the Category schema
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Middleware to remove sub-categories when a category is deleted using findByIdAndDelete
categorySchema.pre("findOneAndDelete", async function (next) {
  const categoryId = this.getQuery()["_id"]; // Get the ID of the category being deleted

  // Remove all sub-categories/products associated with the category
  await SubCategory.deleteMany({ category: categoryId });
  await Product.deleteMany({ category: categoryId });

  next();
});

// Check if the Category model already exists before creating it
export const Category =
  models.Category || model<ICategory>("Category", categorySchema);
