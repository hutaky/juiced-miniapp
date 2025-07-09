// pages/frame-ui.js

import { useEffect } from 'react';

export default function FrameUI() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window?.farcaster?.actions?.ready) {
      window.farcaster.actions.ready();
    }
  }, []);

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '2rem',
        background: '#ff69b4',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <h1>🥤 Welcome to JUICED!</h1>
      <p>Play through Warpcast → Tap "Drink 🍹" to get your points!</p>
      <p>Return tomorrow for more drinks & points!</p>
    </div>
  );
}


