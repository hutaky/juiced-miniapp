export async function POST(req) {
  const { fid } = await req.json();
  const drinksLeft = 1;
  return Response.json({
    frame: {
      version: "vNext",
      image: `https://juiced.vercel.app/images/today.jpg`,
      buttons: [{ label: "Drink 🍹", action: "post", target: "https://juiced.vercel.app/api/drink" }],
      postUrl: "https://juiced.vercel.app/api/drink"
    },
    meta: { text: `You have ${drinksLeft} drink(s) left today!` }
  });
}

