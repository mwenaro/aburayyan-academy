import { Schema, model, models, Document, Types } from "mongoose";
import { ICategory } from "./Category";
import { ISubCategory } from "./SubCategory";

// Define an interface for the Product document
export interface IProduct extends Document {
  name: string;
  category: Types.ObjectId | ICategory;
  subCategory: Types.ObjectId | ISubCategory;
  price: number;
  description?: string;
  availability: boolean;
  trends: ("new arrival" | "best selling" | "featured" | "flashsale")[];
  quantity: number;
  imgUrl: string;
  images: {
    url: string;
    key?: string;
  }[];
}

// Define the Product schema
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    trends: {
      type: [String],
      enum: ["new arrival", "best selling", "featured", "flashsale"],
      default: [],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    imgUrl: {
      type: String,
      // required: true
    },
    images: {
      type: [{ url: String, key: String }],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Check if the Product model already exists before creating it
export const Product =
  models.Product || model<IProduct>("Product", productSchema);
