import type { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { AppError } from "../utils/AppError.js";
import assignmentServices from "../services/assignment.js";
import { sendResponse } from "../utils/Response.js";

// Handler to create a new assignment
async function createAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;

    const response = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      dueDate: z.coerce.date(),
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
    let assignments;
    if (user.role === 'teacher') {
      assignments = await assignmentServices.getAssignmentsByUserId({
        userId: user._id,
      });
    } else {
      assignments = await assignmentServices.getAllAssignments();
    }
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
      dueDate: z.coerce.date().optional(),
    }).safeParse({ ...req.params, ...req.body });

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request data",
      });
    }
    const { assignmentId, title, description, dueDate } = response.data;

    const updateData: any = {
      assignmentId,
      userId: user._id,
    };
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);

    const assignment = await assignmentServices.updateAssignment(updateData);

    if (!assignment) {
      throw new AppError({
        statusCode: 404,
        message: "Assignment not found or unauthorized",
      });
    }

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


const assignmentController = {
  createAssignment,
  getAllUserAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};

export default assignmentController;  