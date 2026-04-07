import { Request, Response } from 'express';
import { sendResponse } from "../utils/Response";

export function healthCheckHandler(req : Request, res : Response) {
  return sendResponse(res, {
    success: true,
    message: "Server is healthy",
    data: {},
  }, 200);
}