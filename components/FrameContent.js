import { useEffect } from "react";

export default function FrameContent() {
  useEffect(() => {
    if (window.sdk?.actions?.ready) {
      window.sdk.actions.ready();
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Welcome to JUICED MiniApp!</h1>
      <p>Enjoy your daily drink 🍹 and score some points!</p>
    </div>
  );
}
