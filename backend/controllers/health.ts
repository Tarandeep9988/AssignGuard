import type { Request, Response } from 'express';
import { sendResponse } from "../utils/Response.js";

export function healthCheckHandler(req : Request, res : Response) {
  return sendResponse(res, {
    success: true,
    message: "Server is healthy",
    data: {},
  }, 200);
}