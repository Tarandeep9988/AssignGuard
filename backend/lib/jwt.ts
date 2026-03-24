import jwt, { SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export function signToken({userId} : {userId: mongoose.Types.ObjectId}): string {
  return jwt.sign({userId}, JWT_SECRET, {
    expiresIn: '1h',
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}

export function getTokenFromHeader(header: string): string | null {
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  return null;
}


