import { addAssignmentService } from "@/app/services/assignment";
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
