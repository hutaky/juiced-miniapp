import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const FREE_FID = "511843"; // Ez a korlátlan "VIP" FID

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    // 1. Ellenőrizzük, hogy van-e már user a táblában
    let { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("fid", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = not found
      throw error;
    }

    // Ha nincs user, létrehozzuk
    if (!user) {
      const insertRes = await supabase
        .from("users")
        .insert([{ fid: userId, score: 0 }])
        .select()
        .single();

      if (insertRes.error) throw insertRes.error;

      user = insertRes.data;
    }

    // Ha nem VIP, nézzük az utolsó drink idejét és limitáljuk 1 percenként
    const now = new Date();
    const lastDrink = user.last_drink ? new Date(user.last_drink) : null;

    if (userId !== FREE_FID && lastDrink) {
      const diffMs = now - lastDrink;
      if (diffMs < 60000) {
        return res.status(429).json({
          meta: { text: "Slow down! Please wait before drinking again." },
          score: user.score,
        });
      }
    }

    // Pontok generálása (pl random 1-10)
    const points = Math.floor(Math.random() * 10) + 1;

    // Frissítés: új pontszám és last_drink idő
    const newScore = user.score + points;
    const updateRes = await supabase
      .from("users")
      .update({ score: newScore, last_drink: now.toISOString() })
      .eq("id", user.id);

    if (updateRes.error) throw updateRes.error;

    // A drinks táblába is beszúrjuk a rekordot
    const drinkInsert = await supabase
      .from("drinks")
      .insert([{ user_id: user.id, points }]);

    if (drinkInsert.error) throw drinkInsert.error;

    return res.status(200).json({
      meta: { text: `You earned ${points} points!` },
      score: newScore,
    });
  } catch (error) {
    console.error("Drink API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
