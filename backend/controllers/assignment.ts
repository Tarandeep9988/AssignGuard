import { NextFunction, Request, Response } from "express";
import zod from "zod";
import { AppError } from "../utils/AppError";
import assignmentServices from "../services/assignment";

async function getAllAssignments(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    const assignments = await assignmentServices.getAssignmentsByUserId({
      userId: user._id,
    });
    return res.status(200).json({
      success: true,
      data: {
        assignments,
      }
    });
  } catch (error) {
    next(error);
  }
}

const createAssignmentSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
  dueDate: zod.string().refine((date) => !isNaN(Date.parse(date))),
});

async function createAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    const response = createAssignmentSchema.safeParse(req.body);
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request body",
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

    return res.status(201).json({
      success: true,
      data: {
        assignment,
      }
    });

  } catch (error) {
    next(error);
  }
}

async function deleteAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      throw new AppError({
        statusCode: 400,
        message: "Invalid assignment ID",
      });
    }

    const assignment = await assignmentServices.deleteAssignment({
      id,
    });

    if (!assignment) {
      throw new AppError({
        statusCode: 404,
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        assignment,
      }
    });

  } catch (error) {
    next(error);
  }
}


const assignmentController = {
  getAllAssignments,
  createAssignment,
  deleteAssignment
}

export default assignmentController;