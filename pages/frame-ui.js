import Head from "next/head";

export default function FrameUI() {

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
  const [message, setMessage] = useState("Loading user info...");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initFarcaster() {
      if (window.farcaster && window.farcaster.actions && window.farcaster.user) {
        try {
          const user = await window.farcaster.user.get();
          setUserId(user.fid);
          setMessage("Ready to drink! 🍹");
        } catch {
          setMessage("Failed to get user info.");
        }
        window.farcaster.actions.ready();
      } else {
        setMessage("Please open this inside Warpcast (Farcaster app).");
      }
    }
    initFarcaster();
  }, []);

  async function handleDrink() {
    if (!userId || loading) return;
    setLoading(true);
    setMessage("Drinking... 🍹");
    try {
      const res = await fetch("/api/drink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.meta?.text) {
        setMessage(data.meta.text);
      }
      const newScore = data.frame?.image?.src
        ? Number(data.frame.image.src.match(/score=(\d+)/)?.[1])
        : null;
      setScore(newScore);
    } catch {
      setMessage("Error while drinking. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "2rem",
        background: "#ff69b4",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      return (
    <>
      <Head>
        <title>JUICED MiniApp</title>
        <meta property="og:title" content="JUICED MiniApp" />
        <meta property="og:description" content="Play JUICED MiniApp on Farcaster / Warpcast!" />
        <meta property="og:image" content="https://juiced-miniapp.vercel.app/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JUICED MiniApp" />
        <meta name="twitter:description" content="Play JUICED MiniApp on Farcaster / Warpcast!" />
        <meta name="twitter:image" content="https://juiced-miniapp.vercel.app/preview.png" />
      </Head>
      <h1>🥤 JUICED MiniApp</h1>
      {userId ? <p>Your Farcaster ID: {userId}</p> : <p>{message}</p>}
      {score !== null && <p>Your score: {score}</p>}
      <button
        onClick={handleDrink}
        disabled={!userId || loading}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          marginTop: "1rem",
          cursor: userId && !loading ? "pointer" : "not-allowed",
          backgroundColor: "#fff",
          color: "#ff69b4",
          border: "none",
          borderRadius: "8px",
        }}
      >
        {loading ? "Drinking..." : "Drink 🍹"}
      </button>
      <Leaderboard />
    </div>
  );
}

