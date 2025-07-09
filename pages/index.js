// pages/index.js

export default function Home() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ff69b4 0%, #ffccff 100%)",
      color: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>JUICED 🍹</h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "400px", textAlign: "center" }}>
        A daily mini-game on Farcaster where you get your daily drink and earn points! Connect, play, and compete on the leaderboard.
      </p>
      <img
        src="/placeholder-drink.png"
        alt="Juiced drink illustration"
        style={{ width: "250px", margin: "2rem 0" }}
      />
      <a
        href="/frame-ui"
        style={{
          backgroundColor: "#fff",
          color: "#ff69b4",
          padding: "1rem 2rem",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "1.25rem",
          textDecoration: "none",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#ffd1e8")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
      >
        Play Now
      </a>
    </main>
  );
}
