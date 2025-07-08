export default async function handler(req, res) {
  res.status(200).json({
    frame: {
      version: "vNext",
      url: "https://juiced-miniapp.vercel.app/frame-ui" // a frontend UI 
    },
    meta: {
      text: "Welcome to JUICED! Tap to drink and score."
    }
  });
}

