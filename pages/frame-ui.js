// pages/frame-ui.js

import { useEffect, useState } from "react";

function Leaderboard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/leaderboard");
        const json = await res.json();
        setBoard(json.leaderboard || []);
      } catch {
        setBoard([]);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ marginTop: 40, color: "#fff" }}>
      <h2>🏆 Leaderboard</h2>
      <ol style={{ textAlign: "left", maxWidth: 300, margin: "0 auto" }}>
        {board.length === 0 && <li>No scores yet.</li>}
        {board.map(({ user_id, score }, i) => (
          <li key={i}>
            <strong>{user_id}</strong>: {score} pts
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function FrameUI() {
  const [userId, setUserId] = useState(null);
  const [message, setMe]()




