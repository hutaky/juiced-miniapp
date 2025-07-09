// pages/index.js

export default function Home() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to JUICED MiniApp!</h1>
      <p>Connect with Farcaster to play the daily drink game.</p>
      <img
        src="/placeholder-drink.png"
        alt="Juiced drink placeholder"
        style={{ maxWidth: '300px', marginTop: '1rem' }}
      />
    </main>
  );
}
