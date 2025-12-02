import mongoose, { Schema, Document } from "mongoose";

export interface IFoundItem extends Document {
  title: string;
  category: string;
  description: string;
  location_found: string;
  date_found: Date;
  image_url: string;
  stored_at: string;
  finder_user_id: mongoose.Types.ObjectId;
  status: "pending" | "approved" | "returned";
  createdAt: Date;
  updatedAt: Date;
}

const foundItemSchema = new Schema<IFoundItem>(
  {
    title: {
      type: String,
      required: [true, "Item title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Electronics", "Books", "Wallet", "Keys", "Others"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location_found: {
      type: String,
      required: [true, "Location found is required"],
    },
    date_found: {
      type: Date,
      required: [true, "Date found is required"],
    },
    image_url: {
      type: String,
      default: null,
    },
    stored_at: {
      type: String,
      required: [true, "Storage location is required"],
      enum: ["security_office", "library_desk", "reception", "lost_and_found"],
    },
    finder_user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "returned"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Index for faster queries
foundItemSchema.index({ finder_user_id: 1 });
foundItemSchema.index({ status: 1 });
foundItemSchema.index({ category: 1 });

export default mongoose.model<IFoundItem>("FoundItem", foundItemSchema);
