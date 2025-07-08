export default async function handler(req, res) {
  const { fid } = req.body || {};

  const drinksLeft = 1; // Dummy data

  res.status(200).json({
    frame: {
      version: "vNext",
      image: `https://juiced-miniapp.vercel.app/images/today.jpg`,
      buttons: [
        {
          label: "Drink 🍹",
          action: "post",
          target: "https://juiced-miniapp.vercel.app/api/drink"
        }
      ],
      postUrl: "https://juiced-miniapp.vercel.app/api/drink"
    },
    meta: {
      text: `You have ${drinksLeft} drink(s) left today!`
    }
  });
}
