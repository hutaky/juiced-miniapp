// pages/api/frame.js

export default function handler(req, res) {
  const score = 0;

  res.status(200).json({
    frame: {
      version: "vNext",
      image: {
        src: `https://juiced-miniapp.vercel.app/api/score-image?score=${score}`
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
      text: `You have 1 drink left today!`
    }
  });
}

