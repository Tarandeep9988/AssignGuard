import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export function signToken({userId} : {userId: mongoose.Types.ObjectId}): string {
  return jwt.sign({userId}, JWT_SECRET, {
    expiresIn: '1h',
  });
}



export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
    // extract payload from token and return it
  } catch (error) {
    throw new AppError({
      statusCode: 401,
      message: "Invalid token",
    });
  }
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
