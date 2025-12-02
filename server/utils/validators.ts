import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation middleware
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }
  next();
};

// Auth validators
export const registerValidators = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("phone").matches(/^[0-9]{10}$/).withMessage("Phone must be 10 digits"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidators = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// Lost item validators
export const createLostItemValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category").isIn(["Electronics", "Books", "Wallet", "Keys", "Others"]).withMessage("Invalid category"),
  body("description").trim().notEmpty().withMessage("Description is required").isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
  body("location_lost").trim().notEmpty().withMessage("Location lost is required"),
  body("date_lost").isISO8601().withMessage("Valid date is required"),
];

// Found item validators
export const createFoundItemValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category").isIn(["Electronics", "Books", "Wallet", "Keys", "Others"]).withMessage("Invalid category"),
  body("description").trim().notEmpty().withMessage("Description is required").isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
  body("location_found").trim().notEmpty().withMessage("Location found is required"),
  body("date_found").isISO8601().withMessage("Valid date is required"),
  body("stored_at").isIn(["security_office", "library_desk", "reception", "lost_and_found"]).withMessage("Invalid storage location"),
];

// Claim validators
export const createClaimValidators = [
  body("item_id").isMongoId().withMessage("Valid item ID is required"),
  body("item_type").isIn(["lost", "found"]).withMessage("Item type must be 'lost' or 'found'"),
  body("claim_message").trim().notEmpty().withMessage("Claim message is required").isLength({ min: 10 }).withMessage("Message must be at least 10 characters"),
];
