import { Request, Response, NextFunction } from "express";
import FoundItem from "../models/FoundItem";
import { AppError, asyncHandler } from "../middleware/errorHandler";
import { uploadImage } from "../utils/cloudinary";

export const createFoundItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const { title, category, description, location_found, date_found, stored_at } = req.body;
  let image_url = null;

  // Upload image if provided
  if (req.file) {
    image_url = (await uploadImage(req.file.buffer, req.file.originalname)) as string;
  }

  const foundItem = await FoundItem.create({
    title,
    category,
    description,
    location_found,
    date_found,
    image_url,
    stored_at,
    finder_user_id: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Found item reported successfully",
    data: foundItem,
  });
});

export const getFoundItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const status = req.query.status || "approved";

  const items = await FoundItem.find({ status })
    .populate("finder_user_id", "name email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await FoundItem.countDocuments({ status });

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

export const getFoundItemById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const item = await FoundItem.findById(req.params.id).populate("finder_user_id", "name email phone");

  if (!item) {
    return next(new AppError("Found item not found", 404));
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

export const updateFoundItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  let item = await FoundItem.findById(req.params.id);

  if (!item) {
    return next(new AppError("Found item not found", 404));
  }

  // Check if user is owner or admin
  if (item.finder_user_id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new AppError("Not authorized to update this item", 403));
  }

  const { title, category, description, location_found, date_found, stored_at } = req.body;
  let image_url = item.image_url;

  // Upload new image if provided
  if (req.file) {
    image_url = (await uploadImage(req.file.buffer, req.file.originalname)) as string;
  }

  item = await FoundItem.findByIdAndUpdate(
    req.params.id,
    {
      title: title || item.title,
      category: category || item.category,
      description: description || item.description,
      location_found: location_found || item.location_found,
      date_found: date_found || item.date_found,
      stored_at: stored_at || item.stored_at,
      image_url,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Found item updated successfully",
    data: item,
  });
});

export const deleteFoundItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const item = await FoundItem.findById(req.params.id);

  if (!item) {
    return next(new AppError("Found item not found", 404));
  }

  // Check if user is owner or admin
  if (item.finder_user_id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new AppError("Not authorized to delete this item", 403));
  }

  await FoundItem.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Found item deleted successfully",
  });
});

export const getUserFoundItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const items = await FoundItem.find({ finder_user_id: req.user._id })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await FoundItem.countDocuments({ finder_user_id: req.user._id });

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
