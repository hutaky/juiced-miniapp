// pages/api/drink.js

export default async function handler(req, res) {
  const randomScore = Math.floor(Math.random() * 100) + 1;

  res.status(200).json({
    frame: {
      version: "vNext",
      image: {
        src: `https://juiced-miniapp.vercel.app/api/score-image?score=${randomScore}`
      },
      buttons: [
        {
          label: "Drink again 🍹",
          action: "post",
          target: "https://juiced-miniapp.vercel.app/api/drink"
        }
      ]
    },
    meta: {
      text: `You earned ${randomScore} points today!`
    }
  });
}

