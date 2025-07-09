export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Received webhook event from Farcaster:", req.body);

    // Például: logolás, adatbázisba mentés, ellenőrzés, válasz
    res.status(200).json({ status: "ok" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
