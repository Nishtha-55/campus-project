import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth";
import {
  registerValidators,
  loginValidators,
  validateRequest,
} from "../utils/validators";

const router = Router();

router.post("/register", registerValidators, validateRequest, register);
router.post("/login", loginValidators, validateRequest, login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
