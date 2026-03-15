import { addSubmissionService, deleteSubmissionService, getSubmissionsService } from "@/app/services/submission";
import { createSubmissionSchema, getSubmissionsSchema } from "@/schemas/submission";
import { NextResponse } from "next/server";

export async function addSubmissionController(data) {
  try {
    const result = createSubmissionSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid submission data",
        },
        { status: 400 }
      );
    }

    const submission = await addSubmissionService(data);

    return NextResponse.json(
      {
        success: true,
        data: {
          submission,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error processing submission",
      },
      { status: 500 }
    );
  }
}


export async function deleteSubmissionController(data) {
  try {
    const id = data.id;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Submission ID is required",
        },
        { status: 400 }
      );
    }
    const submission = await deleteSubmissionService(id);

    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          message: "Submission not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Submission deleted successfully",
        submission,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error deleting submission",
      },
      { status: 500 }
    );
  }
}

export async function getSubmissionsController({ assignmentId }) {
  try {
    const result = getSubmissionsSchema.safeParse({ assignmentId });
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data",
        },
        { status: 400 }
      );
    }

    const submissions = await getSubmissionsService(assignmentId);
    return NextResponse.json(
      {
        success: true,
        data: {
          submissions,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error fetching submissions",
      },
      { status: 500 }
    );
  }
}