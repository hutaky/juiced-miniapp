export default async function handler(req, res) {
  const leaderboard = [
    { fid: 123, score: 87 },
    { fid: 456, score: 81 },
    { fid: 789, score: 76 }
  ];

  res.status(200).json(leaderboard);
}
