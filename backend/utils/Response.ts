import type { Response } from "express";

type ResponseData = {
  success: boolean;
  message: string;
  data : object;
}

export function sendResponse(
  res: Response,
  {
    success,
    message,
    data,
  } : ResponseData,
  statusCode: number
) {
  return res.status(statusCode).json({
    success,
    message,
    data,
  })
}
