import { Request, Response, NextFunction } from "express";
import LostItem from "../models/LostItem";
import { AppError, asyncHandler } from "../middleware/errorHandler";
import { uploadImage } from "../utils/cloudinary";

export const createLostItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const { title, category, description, location_lost, date_lost } = req.body;
  let image_url = null;

  // Upload image if provided
  if (req.file) {
    image_url = (await uploadImage(req.file.buffer, req.file.originalname)) as string;
  }

  const lostItem = await LostItem.create({
    title,
    category,
    description,
    location_lost,
    date_lost,
    image_url,
    user_id: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Lost item reported successfully",
    data: lostItem,
  });
});

export const getLostItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const status = req.query.status || "approved";

  const items = await LostItem.find({ status })
    .populate("user_id", "name email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await LostItem.countDocuments({ status });

  res.status(200).json({
    success: true,
    data: items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getLostItemById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const item = await LostItem.findById(req.params.id).populate("user_id", "name email phone");

  if (!item) {
    return next(new AppError("Lost item not found", 404));
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

export const updateLostItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  let item = await LostItem.findById(req.params.id);

  if (!item) {
    return next(new AppError("Lost item not found", 404));
  }

  // Check if user is owner or admin
  if (item.user_id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new AppError("Not authorized to update this item", 403));
  }

  const { title, category, description, location_lost, date_lost } = req.body;
  let image_url = item.image_url;

  // Upload new image if provided
  if (req.file) {
    image_url = (await uploadImage(req.file.buffer, req.file.originalname)) as string;
  }

  item = await LostItem.findByIdAndUpdate(
    req.params.id,
    {
      title: title || item.title,
      category: category || item.category,
      description: description || item.description,
      location_lost: location_lost || item.location_lost,
      date_lost: date_lost || item.date_lost,
      image_url,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Lost item updated successfully",
    data: item,
  });
});

export const deleteLostItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const item = await LostItem.findById(req.params.id);

  if (!item) {
    return next(new AppError("Lost item not found", 404));
  }

  // Check if user is owner or admin
  if (item.user_id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new AppError("Not authorized to delete this item", 403));
  }

  await LostItem.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Lost item deleted successfully",
  });
});

export const getUserLostItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const items = await LostItem.find({ user_id: req.user._id })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await LostItem.countDocuments({ user_id: req.user._id });

  res.status(200).json({
    success: true,
    data: items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});
