import { Router } from "express";
import {
  createClaim,
  getUserClaims,
  getClaimsByItemId,
  updateClaimStatus,
  deleteClaim,
} from "../controllers/claim.controller";
import { protect } from "../middleware/auth";
import {
  createClaimValidators,
  validateRequest,
} from "../utils/validators";

const router = Router();

router.post(
  "/",
  protect,
  createClaimValidators,
  validateRequest,
  createClaim
);

router.get("/user", protect, getUserClaims);
router.get("/item/:itemId", getClaimsByItemId);
router.put("/:id", protect, updateClaimStatus);
router.delete("/:id", protect, deleteClaim);

export default router;
