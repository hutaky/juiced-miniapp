export default function handler(req, res) {
  res.status(200).json({
    frame: {
      version: "vNext",
      image: {
        src: "https://juiced-miniapp.vercel.app/api/score-image?score=0"
      },
      buttons: [
        {
          label: "Drink 🍹",
          action: "post",
          target: "https://juiced-miniapp.vercel.app/api/drink"
        }
      ]
    },
    meta: {
      text: "Welcome to JUICED! Tap to drink and score."
    }
  });
}
