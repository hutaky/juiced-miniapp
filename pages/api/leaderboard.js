import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("scores")
    .select("user_id, score")
    .order("score", { ascending: false })
    .limit(10);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ leaderboard: data });
}
