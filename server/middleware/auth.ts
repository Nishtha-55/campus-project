import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IUser } from "../models/User";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export const authenticateJWT = passport.authenticate("jwt", { session: false });

export const protect = (req: Request, res: Response, next: NextFunction) => {
  authenticateJWT(req, res, (err: any) => {
    if (err || !req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    next();
  });
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "User role not authorized to access this route",
      });
    }
    next();
  };
};

export const adminOnly = authorize("admin");
