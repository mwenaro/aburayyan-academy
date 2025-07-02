import { Schema, model, models, Document, Types } from "mongoose";
import { ICategory } from "./Category"; // Assuming Category is in the same directory
import { Product } from "./Product";

// Define an interface for the SubCategory document
export interface ISubCategory extends Document {
  name: string;
  category: Types.ObjectId | ICategory; // Reference to the Category model
  active: boolean;
}

// Define the SubCategory schema
const subCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
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
subCategorySchema.pre("findOneAndDelete", async function (next) {
  const subCategoryId = this.getQuery()["_id"]; // Get the ID of the category being deleted

  // Remove all products associated with the category

  await Product.deleteMany({ subCategory: subCategoryId });

  next();
});

// Check if the SubCategory model already exists before creating it
export const SubCategory =
  models.SubCategory || model<ISubCategory>("SubCategory", subCategorySchema);
