import { useEffect } from "react";

export default function FrameUI() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window?.sdk?.actions?.ready) {
        window.sdk.actions.ready();
      }
    }, 100); // biztosítjuk, hogy minden betöltött legyen

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Welcome to JUICED MiniApp!</h1>
      <p>Enjoy your daily drink 🍹 and score some points!</p>
    </div>
  );
}

