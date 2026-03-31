import { NextFunction, Request, Response } from "express";
import * as z from "zod";
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

const getAssignmentByIdSchema = z.object({
  assignmentId: z.string().min(1),
});

async function getAssignmentById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    const { assignmentId } = req.params;
    if (!assignmentId || typeof assignmentId !== 'string') {
      throw new AppError({
        statusCode: 400,
        message: "Invalid assignmentId parameter",
      });
    }

    const assignment = await assignmentServices.getAssignmentById({
      assignmentId,
      userId: user._id,
    });
    if (!assignment) {
      throw new AppError({
        statusCode: 404,
        message: "Assignment not found or access denied",
      });
    }
    return res.status(200).json({
      success: true,
      data: { assignment },
    });
  } catch (error) {
    next(error);
  }
}

const createAssignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date))),
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

const updateAssignmentSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date))).optional(),
});



const deleteAssignmentSchema = z.object({
  assignmentId: z.string().min(1),
});

async function deleteAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    const response = deleteAssignmentSchema.safeParse({...req.params, ...req.body});
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid assignmentId parameter",
      });
    }
    const { assignmentId } = response.data;

    const assignment = await assignmentServices.deleteAssignment({
      id: assignmentId,
    });
    if (!assignment) {
      throw new AppError({
        statusCode: 404,
        message: "Assignment not found or access denied",
      });
    }
    return res.status(200).json({
      success: true,
      data: { assignment },
    });
  } catch (error) {
    next(error);
  }
}

// Controller to handle plagiarism report


async function getPlagiarismReport(req: Request, res: Response, next: NextFunction) {
  try {
    const response = z.object({
      assignmentId: z.string().min(1),
    }).safeParse({...req.params, ...req.body});

    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid assignmentId parameter",
      });
    }
    const { assignmentId } = response.data;

    // const report = await assignmentServices.getPlagiarismReport({
    //   assignmentId,
    // });

    return res.status(200).json({
      success: true,
      message: "Plagiarism report generation is not implemented yet",
    })

  } catch (error) {
    next(error);
  }
}

const assignmentController = {
  getAllAssignments,
  getAssignmentById,
  getPlagiarismReport,  
  createAssignment,
  // updateAssignment,
  deleteAssignment,
};

export default assignmentController;  