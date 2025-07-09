// pages/index.js
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>JUICED MiniApp</title>
        <meta name="description" content="Play JUICED MiniApp on Farcaster / Warpcast!" />
        <meta property="og:title" content="JUICED MiniApp" />
        <meta property="og:description" content="Play JUICED MiniApp on Farcaster / Warpcast!" />
        <meta property="og:image" content="https://juiced-miniapp.vercel.app/preview.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JUICED MiniApp" />
        <meta name="twitter:description" content="Play JUICED MiniApp on Farcaster / Warpcast!" />
        <meta name="twitter:image" content="https://juiced-miniapp.vercel.app/preview.png" />
      </Head>

      <main
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ff69b4",
          color: "white",
          fontFamily: "Arial, sans-serif",
          flexDirection: "column",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1>Welcome to JUICED MiniApp</h1>
        <p>Play JUICED MiniApp on Farcaster / Warpcast!</p>
        <p>
          Open this app inside Warpcast to get started:{" "}
          <a href="https://juiced-miniapp.vercel.app/frame-ui" style={{ color: "#fff", textDecoration: "underline" }}>
            Start Playing
          </a>
        </p>
      </main>
    </>
  );
}

