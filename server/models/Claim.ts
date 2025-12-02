import mongoose, { Schema, Document } from "mongoose";

export interface IClaim extends Document {
  user_id: mongoose.Types.ObjectId;
  item_id: mongoose.Types.ObjectId;
  item_type: "lost" | "found";
  claim_message: string;
  claim_status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const claimSchema = new Schema<IClaim>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "item_type",
    },
    item_type: {
      type: String,
      required: true,
      enum: ["LostItem", "FoundItem"],
    },
    claim_message: {
      type: String,
      required: [true, "Claim message is required"],
      minlength: [10, "Claim message must be at least 10 characters"],
    },
    claim_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Index for faster queries
claimSchema.index({ user_id: 1 });
claimSchema.index({ item_id: 1 });
claimSchema.index({ claim_status: 1 });

export default mongoose.model<IClaim>("Claim", claimSchema);
