import { addAssignmentService, deleteAssignmentService } from "@/app/services/assignment";
import { createAssignmentSchema } from "@/schemas/assignment";

export async function addAssignmentController(request) {
  // validate request body
  try {
    const body = await request.json();
    const result = createAssignmentSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid data",
        }),
        { status: 400 }
      );
    }

    const assignment = await addAssignmentService(result.data);
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          assignment,
        },
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Assignment controller error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Error processing request",
      }),
      { status: 500 }
    );
  }
};


export async function deleteAssignmentController(params) {
  try {
    
    const id = (await params).id;
    console.log("Deleting assignment with id:", id);
    const assignment = await deleteAssignmentService(id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Assignment deleted successfully",
        assignment,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete assignment controller error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Error processing request",
      }),
      { status: 500 }
    );
  }
}