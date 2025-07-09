export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("✅ Webhook received from Farcaster:", req.body);

    // Itt bővítheted adatbázis mentéssel, logikával stb.
    // Példa: csak logolás egy header-rel együtt
    const event = req.body;
    const signature = req.headers["x-hub-signature-256"]; // ha használnál HMAC aláírást

    // Esetleg valós ellenőrzés később (token, secret, stb.)
    // Mentés vagy egyéb logika ide

    res.status(200).json({ status: "ok" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

