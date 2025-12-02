import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AppError, asyncHandler } from "../middleware/errorHandler";
import { getJwtSecret } from "../config/passport";

// Generate JWT token
const generateToken = (id: string) => {
  const secret = getJwtSecret();
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("Email already registered", 400));
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  const token = generateToken(user._id.toString());

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Find user and explicitly select password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  const token = generateToken(user._id.toString());

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  const { name, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});
