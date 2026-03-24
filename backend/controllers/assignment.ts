import { NextFunction, Request, Response } from "express";

async function getAllAssignments(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json({
      success: true,
      data: "All assignments",
    });
  } catch (error) {
    next(error);
  }
}


const assignmentController = {
  getAllAssignments,
}

export default assignmentController;