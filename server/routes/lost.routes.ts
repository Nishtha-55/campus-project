import { Router } from "express";
import multer from "multer";
import {
  createLostItem,
  getLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
  getUserLostItems,
} from "../controllers/lost.controller";
import { protect } from "../middleware/auth";
import {
  createLostItemValidators,
  validateRequest,
} from "../utils/validators";

const router = Router();

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  protect,
  upload.single("image"),
  createLostItemValidators,
  validateRequest,
  createLostItem
);

router.get("/", getLostItems);
router.get("/my-items", protect, getUserLostItems);
router.get("/:id", getLostItemById);
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateLostItem
);
router.delete("/:id", protect, deleteLostItem);

export default router;
