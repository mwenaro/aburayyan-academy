import { Document, model, models, Schema } from "mongoose";

export interface ITemplate extends Document {
  title: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'xlsx' | 'ppt' | 'pptx' | 'txt' | 'other';
  fileSize: number;
  grade: string; // Grade/Class this template is for (e.g., "Grade 1", "PP1", etc.)
  subject?: string; // Subject this template is for (optional)
  category: 'exam' | 'assignment' | 'worksheet' | 'lesson-plan' | 'other';
  uploadedBy: {
    userId: string;
    userName: string;
    userRole: string;
  };
  isActive: boolean;
  downloadCount: number;
  tags?: string[]; // For better searchability
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>(
  {
    title: {
      type: String,
      required: [true, "Template title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    fileName: {
      type: String,
      required: [true, "File name is required"],
      trim: true
    },
    filePath: {
      type: String,
      required: [true, "File path is required"],
      trim: true
    },
    fileType: {
      type: String,
      required: [true, "File type is required"],
      enum: ['pdf', 'doc', 'docx', 'xlsx', 'ppt', 'pptx', 'txt', 'other'],
      lowercase: true
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"],
      min: [0, "File size cannot be negative"]
    },
    grade: {
      type: String,
      required: [true, "Grade is required"],
      trim: true
    },
    subject: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ['exam', 'assignment', 'worksheet', 'lesson-plan', 'other'],
      lowercase: true
    },
    uploadedBy: {
      userId: {
        type: String,
        required: [true, "Uploader user ID is required"]
      },
      userName: {
        type: String,
        required: [true, "Uploader user name is required"]
      },
      userRole: {
        type: String,
        required: [true, "Uploader user role is required"]
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    downloadCount: {
      type: Number,
      default: 0,
      min: [0, "Download count cannot be negative"]
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
TemplateSchema.index({ grade: 1, category: 1 });
TemplateSchema.index({ isActive: 1 });
TemplateSchema.index({ 'uploadedBy.userId': 1 });
TemplateSchema.index({ tags: 1 });
TemplateSchema.index({ createdAt: -1 });

// Virtual for file size in human readable format
TemplateSchema.virtual('fileSizeFormatted').get(function() {
  const bytes = this.fileSize;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

export const Template = models.Template || model<ITemplate>("Template", TemplateSchema);
