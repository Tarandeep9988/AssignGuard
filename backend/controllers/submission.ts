import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { AppError } from "../utils/AppError";
import submissionServices from "../services/submission";

const createSubmissionSchema = z.object({
  content: z.string().min(1),
  assignmentId: z.string().min(1),
})

async function createSubmission(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.userId;

    const response = createSubmissionSchema.safeParse({ ...req.body, ...req.params });
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request body",
      });
    }

    const { content, assignmentId } = response.data;
    const submission = await submissionServices.createSubmission({
      content,
      userId,
      assignmentId,
    });

    res.status(201).json({
      success: true,
      data: {
        submission,
      }
    }); 
  } catch (error) {
    next(error);
  }
}



const getSubmissionsByUserSchema = z.object({

})
async function getSubmissionsByUser(req: Request, res: Response, next: NextFunction) {
  try {
    const response = getSubmissionsByUserSchema.safeParse({ ...req.body, ...req.params });
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request body",
      });
    }

    const userId = res.locals.userId;
    const submissions = await submissionServices.getSubmissionsByUser({ userId });

    res.status(200).json({
      success: true,
      data: {
        submissions,
      }
    });
  } catch (error) {
    next(error);
  }
}

const getSubmissionsByAssignmentSchema = z.object({
  assignmentId: z.string().min(1),
})

async function getSubmissionsByAssignment(req: Request, res: Response, next: NextFunction) {
  try {
    const response = getSubmissionsByAssignmentSchema.safeParse({ ...req.body, ...req.params });
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request parameters or body",
      });
    }

    const { assignmentId } = response.data;
    const submissions = await submissionServices.getSubmissionsByAssignment({ assignmentId });

    res.status(200).json({
      success: true,
      data: {
        submissions,
      }
    });
  } catch (error) {
    
  }
}


const getSubmissionByIdSchema = z.object({
  id: z.string().min(1),
})
async function getSubmissionById(req: Request, res: Response, next: NextFunction) {
  try {
    const response = getSubmissionByIdSchema.safeParse({ ...req.body, ...req.params });
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request parameters",
      });
    }

    const { id } = response.data;
    const submission = await submissionServices.getSubmissionById({ id });

    res.status(200).json({
      success: true,
      data: {
        submission,
      }
    });
  } catch (error) {
    next(error);
  }
} 


const updateSubmissionSchema = z.object({
  submissionId: z.string().min(1),
  content: z.string().min(1),
})
async function updateSubmission(req: Request, res: Response, next: NextFunction) {
  try {
    const response = updateSubmissionSchema.safeParse({ ...req.params, ...req.body });
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request parameters or body",
      });
    }

    const { submissionId, content } = response.data;
    const submission = await submissionServices.updateSubmission({ id: submissionId, content });

    res.status(200).json({
      success: true,
      message: "Submission updated successfully",
      data: {
        submission,
      }
    });
    
  } catch (error) {
    next(error);
  }
}


const deleteSubmissionSchema = z.object({
  submissionId: z.string().min(1),
})
async function deleteSubmission(req: Request, res: Response, next: NextFunction) {
  try {
    const response = deleteSubmissionSchema.safeParse({ ...req.params, ...req.body });
    if (!response.success) {
      throw new AppError({
        statusCode: 400,
        message: "Invalid request parameters or body",
      });
    }

    const { submissionId } = response.data;

    const submission = await submissionServices.deleteSubmission({ id: submissionId });

    res.status(200).json({
      success: true,
      message: "Submission deleted successfully",
      data: {
        submission: submission,
      }
    });

  } catch (error) {
    next(error);
  }
}

const submissionController = {
  createSubmission,
  getSubmissionsByUser,
  getSubmissionById,
  getSubmissionsByAssignment,
  updateSubmission,
  deleteSubmission
};

export default submissionController;