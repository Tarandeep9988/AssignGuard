import { addAssignmentService, deleteAssignmentService } from "@/app/services/assignment";
import { createAssignmentSchema, deleteAssignmentSchema } from "@/schemas/assignment";
import { NextResponse } from "next/server";

export async function addAssignmentController(data) {
  try {
    const result = createAssignmentSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data",
        },
        { status: 400 }
      );
    }

    const assignment = await addAssignmentService(result.data);
    return NextResponse.json(
      {
        success: true,
        data: {
          assignment,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Assignment controller error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error processing request",
      },
      { status: 500 }
    );
  }
};


export async function deleteAssignmentController(data) {
  try {
    const id = data.id;
    const result = deleteAssignmentSchema.safeParse({ id });
    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid data",
      }, { status: 400 });
    }
    
    const assignment = await deleteAssignmentService(id);
    if (!assignment) {
      return NextResponse.json({
        success: false,
        message: "Assignment not found",
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Assignment deleted successfully",
      assignment,
    }, { status: 200 });  

  } catch (error) {
    console.error("Delete assignment controller error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Error processing request",
    }, { status: 500 });
  }
}