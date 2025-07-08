export async function GET(req) {
  return Response.json({ drinksLeft: 1, playedToday: false, pointsToday: 0 });
}
