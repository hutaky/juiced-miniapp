// pages/frame-ui.js

import { useEffect, useState } from "react";

export default function FrameUI() {
  const [userId, setUserId] = useState(null);
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("Loading user info...");

  useEffect(() => {
    async function getUser() {
      if (window.farcaster && window.farcaster.user) {
        const user = await window.farcaster.user.get();
        setUserId(user.fid);
        setMessage("Ready to drink! 🍹");
      } else {
        setMessage("Please open in Warpcast to use Farcaster features.");
      }
    }
    getUser();

    if (window.farcaster && window.farcaster.actions && window.farcaster.actions.ready) {
      window.farcaster.actions.ready();
    }
  }, []);

  async function handleDrink() {
    if (!userId) return;

    setMessage("Drinking... 🍹");

    try {
      const res = await fetch("/api/drink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (data.meta && data.meta.text) {
        setMessage(data.meta.text);
      }

      // Pontot az API kép URL-ből lehetne szedni, vagy a meta.text alapján megjeleníteni
      // Ha visszaküldesz score-t, itt állíthatod:
      // setScore(scoreFromResponse);

    } catch (error) {
      setMessage("Error while drinking. Please try again.");
    }
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
      <h1>🥤 JUICED MiniApp</h1>
      {userId ? <p>Your Farcaster ID: {userId}</p> : <p>{message}</p>}
      <p>{score !== null ? `Your score: ${score}` : null}</p>
      <button
        onClick={handleDrink}
        disabled={!userId}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          marginTop: "1rem",
          cursor: userId ? "pointer" : "not-allowed",
          backgroundColor: "#fff",
          color: "#ff69b4",
          border: "none",
          borderRadius: "8px",



