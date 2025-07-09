import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    // Keresd meg vagy hozd létre a user-t
    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("fid", userId)
      .single();

    if (userError && userError.code === "PGRST116") {
      // Nincs user, létrehozás
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({ fid: userId, score: 0, last_drink: null })
        .select()
        .single();

      if (createError) throw createError;
      user = newUser;
    } else if (userError) {
      throw userError;
    }

    // Ellenőrizd, ivott-e ma
    const now = new Date();
    const lastDrink = user.last_drink ? new Date(user.last_drink) : null;
    if (lastDrink) {
      const isSameDay =
        lastDrink.getUTCFullYear() === now.getUTCFullYear() &&
        lastDrink.getUTCMonth() === now.getUTCMonth() &&
        lastDrink.getUTCDate() === now.getUTCDate();

      if (isSameDay) {
        return res.status(200).json({
          meta: { text: "You've already drunk today. Come back tomorrow!" },
          frame: { image: { src: `/api/score-image?score=${user.score}` } },
        });
      }
    }

    // Adjon pontot
    const points = 1;

    // Insert a new drink record
    const { error: drinkError } = await supabase.from("drinks").insert({
      user_id: user.id,
      points,
      drink_time: new Date().toISOString(),
    });

    if (drinkError) throw drinkError;

    // Frissítsd a user pontszámot és last_drink-et
    const newScore = user.score + points;
    const { error: updateError } = await supabase
      .from("users")
      .update({ score: newScore, last_drink: new Date().toISOString() })
      .eq("id", user.id);

    if (updateError) throw updateError;

    return res.status(200).json({
      meta: { text: "You earned a drink! 🍹" },
      frame: { image: { src: `/api/score-image?score=${newScore}` } },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error });
  }
}
