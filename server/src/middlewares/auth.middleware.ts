import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "your-secret-key";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json({ message: "Access token missing or invalid" });
       return
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    
    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
     res.status(401).json({ message: "Invalid or expired token" });
     return;
  }
};
