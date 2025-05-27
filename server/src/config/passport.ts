

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/implementation/user.repositories";

dotenv.config();


const userRepo = new UserRepository();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const name = profile.displayName;
        if(!email){
            return done(new Error("Google profile did not return an email."), false);
        }

        const existingUser = await userRepo.findByEmail(email);
        if (existingUser) return done(null, existingUser);

        const newUser = await userRepo.createUser({
          name,
          email,
          password: "", 
          role: "user",
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
