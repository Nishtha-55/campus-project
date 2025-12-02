import mongoose, { Schema, Document } from "mongoose";

export interface ILostItem extends Document {
  title: string;
  category: string;
  description: string;
  location_lost: string;
  date_lost: Date;
  image_url: string;
  user_id: mongoose.Types.ObjectId;
  status: "pending" | "approved" | "claimed";
  createdAt: Date;
  updatedAt: Date;
}

const lostItemSchema = new Schema<ILostItem>(
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
    location_lost: {
      type: String,
      required: [true, "Location lost is required"],
    },
    date_lost: {
      type: Date,
      required: [true, "Date lost is required"],
    },
    image_url: {
      type: String,
      default: null,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "claimed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Index for faster queries
lostItemSchema.index({ user_id: 1 });
lostItemSchema.index({ status: 1 });
lostItemSchema.index({ category: 1 });

export default mongoose.model<ILostItem>("LostItem", lostItemSchema);
