export async function GET() {
  return Response.json([{ fid: 123, score: 87 }, { fid: 456, score: 81 }, { fid: 789, score: 76 }]);
}
