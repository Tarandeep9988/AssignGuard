import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { AppError } from "../utils/AppError";
import assignmentServices from "../services/assignment";
import { sendResponse } from "../utils/Response";

// Handler to create a new assignment
async function createAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;

    const response = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      dueDate: z.date(),
    }).safeParse({ ...req.body, ...req.params });

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }

    const { title, description, dueDate } = response.data;

    const userId = user._id;
    const assignment = await assignmentServices.createAssignment({
      title,
      description,
      dueDate: new Date(dueDate),
      userId,
    });

    return sendResponse(res, {
      success: true,
      message: "Assignment created successfully",
      data: {
        assignment,
      }
    }, 201);

  } catch (error) {
    next(error);
  }
}

async function getAllUserAssignments(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    const assignments = await assignmentServices.getAssignmentsByUserId({
      userId: user._id,
    });
    return sendResponse(res, {
      success: true,
      message: "Assignments retrieved successfully",
      data: {
        assignments,
      }
    }, 200);
  } catch (error) {
    next(error);
  }
}

async function getAssignmentById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;

    const response = z.object({
      assignmentId: z.string().min(1),
    }).safeParse({ ...req.params, ...req.body });

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }
    const { assignmentId } = response.data;

    const assignment = await assignmentServices.getAssignmentById({
      assignmentId,
      userId: user._id,
    });
    if (!assignment) {
      throw new AppError({
        statusCode: 404,
        message: "Assignment not found",
      });
    }
    return sendResponse(res, {
      success: true,
      message: "Assignment retrieved successfully",
      data: { assignment },
    }, 200);
  } catch (error) {
    next(error);
  }
}


async function updateAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;

    const response = z.object({
      assignmentId: z.string().min(1),
      title: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      dueDate: z.date().optional(),
    }).safeParse({ ...req.params, ...req.body });

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }
    const { assignmentId, title, description, dueDate } = response.data;

    const assignment = await assignmentServices.updateAssignment({
      assignmentId,
      userId: user._id,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return sendResponse(res, {
      success: true,
      message: "Assignment updated successfully",
      data: { assignment },
    }, 200);  

  } catch (error) {
    next(error); 
  }
}

async function deleteAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;

    const response = z.object({
      assignmentId: z.string().min(1),
    }).safeParse({...req.params, ...req.body});
    
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }
    const { assignmentId } = response.data;

    const assignment = await assignmentServices.deleteAssignment({
      userId: user._id,
      assignmentId,
    });

    return sendResponse(res, {
      success: true,
      message: "Assignment deleted successfully",
      data: { assignment },
    }, 200);
  } catch (error) {
    next(error);
  }
}

// Controller to handle plagiarism report


async function getPlagiarismReport(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    const response = z.object({
      assignmentId: z.string().min(1),
    }).safeParse({...req.params, ...req.body});

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }
    const { assignmentId } = response.data;

    const report = await assignmentServices.getPlagiarismReport({
      userId: user._id,
      assignmentId,
    });

    return sendResponse(res, {
      success: true,
      message: "Plagiarism report generated successfully",
      data: {
        report,
      }
    }, 200);

  } catch (error) {
    next(error);
  }
}

const assignmentController = {
  createAssignment,
  getAllUserAssignments,
  getAssignmentById,
  getPlagiarismReport,  
  updateAssignment,
  deleteAssignment,
};

export default assignmentController;  