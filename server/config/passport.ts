import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User";

const jwtSecret = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export function initializePassport() {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.id);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

export function getJwtSecret() {
  return jwtSecret;
}
