export async function POST(req) {
  const { fid } = await req.json();
  const alreadyPlayed = false; 
  if (alreadyPlayed) return Response.json({ text: "You already played today! Come back tomorrow." });
  const points = Math.floor(Math.random() * 10) + 1;
  return Response.json({
    text: `You got 🍇 ${points} point${points > 1 ? 's' : ''}!`,
    image: `https://juiced-miniapp.vercel.app/images/result.jpg`,
    buttons: [{ label: "Share & Come Back 🍇", action: "link", target: "https://farcaster.xyz/compose?text=Just%20got%20JUICED!%20🍹%20Try%20it%20here:%20https://YOUR_DOMAIN.vercel.app" }]
  });
}
