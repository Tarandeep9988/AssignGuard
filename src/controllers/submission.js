import { addSubmissionService, deleteSubmissionService } from "@/app/services/submission";
import { createSubmissionSchema } from "@/schemas/submission";

export async function addSubmissionController(request) {
  try {
    const body = await request.json();
    const result = createSubmissionSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid submission data",
        }),
        { status: 400 }
      );
    }

    const submission = await addSubmissionService(result.data);

    return new Response('Received submission data: ' + JSON.stringify(submission));
  } catch (error) {
    return new Response(
      'Error processing submission: ' + error.message,
      { status: 500 }
    );
  }
}


export async function deleteSubmissionController(params) {
  try {
    const id = (await params).id;
    await deleteSubmissionService(id);
    return new Response('Submission deleted successfully');
  } catch (error) {
    return new Response(
      'Error deleting submission: ' + error.message,
      { status: 500 }
    );
  }
}