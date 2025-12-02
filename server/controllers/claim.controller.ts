import { Request, Response, NextFunction } from "express";
import Claim from "../models/Claim";
import LostItem from "../models/LostItem";
import FoundItem from "../models/FoundItem";
import { AppError, asyncHandler } from "../middleware/errorHandler";

export const createClaim = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const { item_id, item_type, claim_message } = req.body;

  // Validate item exists
  const itemModel = item_type === "lost" ? LostItem : FoundItem;
  const item = await itemModel.findById(item_id);

  if (!item) {
    return next(new AppError(`${item_type} item not found`, 404));
  }

  // Check if user already claimed this item
  const existingClaim = await Claim.findOne({
    user_id: req.user._id,
    item_id,
  });

  if (existingClaim) {
    return next(new AppError("You have already claimed this item", 400));
  }

  const claim = await Claim.create({
    user_id: req.user._id,
    item_id,
    item_type: item_type === "lost" ? "LostItem" : "FoundItem",
    claim_message,
  });

  res.status(201).json({
    success: true,
    message: "Claim created successfully",
    data: claim,
  });
});

export const getUserClaims = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const claims = await Claim.find({ user_id: req.user._id })
    .populate("user_id", "name email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Claim.countDocuments({ user_id: req.user._id });

  res.status(200).json({
    success: true,
    data: claims,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getClaimsByItemId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { itemId } = req.params;

  const claims = await Claim.find({ item_id: itemId })
    .populate("user_id", "name email phone")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: claims,
  });
});

export const updateClaimStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const { claim_status } = req.body;

  const claim = await Claim.findById(req.params.id);

  if (!claim) {
    return next(new AppError("Claim not found", 404));
  }

  // Check if user is owner of the item (for found items) or admin
  if (claim.item_type === "FoundItem") {
    const foundItem = await FoundItem.findById(claim.item_id);
    if (!foundItem || (foundItem.finder_user_id.toString() !== req.user._id.toString() && req.user.role !== "admin")) {
      return next(new AppError("Not authorized to update this claim", 403));
    }
  } else {
    // For lost items, allow the owner to update
    const lostItem = await LostItem.findById(claim.item_id);
    if (!lostItem || (lostItem.user_id.toString() !== req.user._id.toString() && req.user.role !== "admin")) {
      return next(new AppError("Not authorized to update this claim", 403));
    }
  }

  const updatedClaim = await Claim.findByIdAndUpdate(
    req.params.id,
    { claim_status },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Claim status updated successfully",
    data: updatedClaim,
  });
});

export const deleteClaim = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const claim = await Claim.findById(req.params.id);

  if (!claim) {
    return next(new AppError("Claim not found", 404));
  }

  // Check if user is owner or admin
  if (claim.user_id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new AppError("Not authorized to delete this claim", 403));
  }

  await Claim.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Claim deleted successfully",
  });
});
