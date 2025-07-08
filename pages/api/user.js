export default async function handler(req, res) {
  const { fid } = req.query;

  res.status(200).json({
    drinksLeft: 1,
    playedToday: false,
    pointsToday: 0
  });
}
