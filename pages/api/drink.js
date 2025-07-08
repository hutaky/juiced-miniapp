import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { untrustedData } = req.body || {};
  const fid = untrustedData?.fid;

  const randomScore = Math.floor(Math.random() * 100) + 1;

  // ⏺️ Pont elmentése Supabase-be
  if (fid) {
    await supabase.from('scores').insert({
      fid,
      score: randomScore,
    });
  }

  res.status(200).json({
    frame: {
      version: "vNext",
      image: {
        src: `https://juiced-miniapp.vercel.app/api/score-image?score=${randomScore}`,
      },
      buttons: [
        {
          label: "Drink again 🍹",
          action: "post",
          target: "https://juiced-miniapp.vercel.app/api/drink",
        },
      ],
    },
    meta: {
      text: `You scored ${randomScore} points!`,
    },
  });
}
