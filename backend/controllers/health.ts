import { Request, Response } from 'express';

export function healthCheckHandler(req : Request, res : Response) {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    data: null,
  });
}