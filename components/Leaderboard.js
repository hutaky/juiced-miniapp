import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch("/api/leaderboard");
      const json = await res.json();
      setBoard(json.leaderboard || []);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ marginTop: 40, color: "#fff" }}>
      <h2>🏆 Leaderboard</h2>
      <ol style={{ textAlign: "left", maxWidth: 300, margin: "0 auto" }}>
        {board.map(({ user_id, score }, i) => (
          <li key={i}>
            <strong>{user_id}</strong>: {score} pts
          </li>
        ))}
      </ol>
    </div>
  );
}
