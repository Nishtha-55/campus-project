import { Router } from "express";
import {
  smartMatch,
  approveItem,
  rejectItem,
  markItemReturned,
  getStatistics,
  getPendingItems,
} from "../controllers/admin.controller";
import { protect, adminOnly } from "../middleware/auth";

const router = Router();

// All admin routes are protected and require admin role
router.use(protect, adminOnly);

router.get("/statistics", getStatistics);
router.get("/pending-items", getPendingItems);
router.put("/approve/:id", approveItem);
router.put("/reject/:id", rejectItem);
router.put("/mark-returned/:id", markItemReturned);
router.get("/match/:lostItemId", smartMatch);

export default router;
