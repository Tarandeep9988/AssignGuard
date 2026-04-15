import type { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { AppError } from "../utils/AppError.js";
import reportServices from "../services/report.js";

import { sendResponse } from "../utils/Response.js";

// Handler to get a specific report
async function getReport(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;

    const response = z.object({
      assignmentId: z.string().min(1),
    }).safeParse({ ...req.body, ...req.params });

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }

    const { assignmentId } = response.data;

    const report = await reportServices.getReport({
      assignmentId,
      userId: user._id,
    });

    return sendResponse(res, {
      success: true,
      message: "Report retrieved successfully",
      data: { report }
    }, 200);
  } catch (error) {
    next(error);
  }
}

// Handler to generate plagiarism report
async function generateReport(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;

    const response = z.object({
      assignmentId: z.string().min(1),
    }).safeParse({ ...req.body, ...req.params });

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }

    const { assignmentId } = response.data;

    const report = await reportServices.generateReport({
      assignmentId,
      userId: user._id,
    });

    return sendResponse(res, {
      success: true,
      message: "Plagiarism report generated successfully",
      data: { report }
    }, 201);
  } catch (error) {
    next(error);
  }
}

const reportController = {
  getReport,
  generateReport,
}

export default reportController;