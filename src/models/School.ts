import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for the School document
export interface ISchool extends Document {
  name: string;
  mobile: string;
  email: string;
  website?: string;
  address?: {
    town: string;
    county: string;
    city: string;
    street: string;
    country:string
  },
  username:string,
  educationSystems:string[]
}

// Define the schema
const SchoolSchema: Schema = new Schema<ISchool>({
  name: {
    type: String,
    required: true,
    unique: true

  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
  },
  website: {
    type: String,
    default:''
  },
  address: {
    town: {
      type: String,
      default:'Mombasa'
    },
    county: {
      type: String,
      default:'Mombasa'
    },
    city: {
      type: String,
      default:'Mombasa'
    },
    street: {
      type: String,
      default:''
    },
    country:{type:String, default: 'Kenya'}
  },
  educationSystems:[{type:String, default:'cbc'}]
}, {timestamps:true});

// Create and export the model
export const SchoolModel: Model<ISchool> = mongoose.model<ISchool>("School", SchoolSchema);


