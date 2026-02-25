export async function DELETE(request, { params }) {
  await connectDb();
  return deleteSubmissionController(params);
}