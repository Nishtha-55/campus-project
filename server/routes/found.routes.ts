import { Router } from "express";
import multer from "multer";
import {
  createFoundItem,
  getFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
  getUserFoundItems,
} from "../controllers/found.controller";
import { protect } from "../middleware/auth";
import {
  createFoundItemValidators,
  validateRequest,
} from "../utils/validators";

const router = Router();

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  protect,
  upload.single("image"),
  createFoundItemValidators,
  validateRequest,
  createFoundItem
);

router.get("/", getFoundItems);
router.get("/my-items", protect, getUserFoundItems);
router.get("/:id", getFoundItemById);
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateFoundItem
);
router.delete("/:id", protect, deleteFoundItem);

export default router;
