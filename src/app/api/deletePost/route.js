import { db } from "../../..//utils/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { voiceId } = req.body;

    if (!voiceId) {
      return res.status(400).json({ error: "Voice ID is required." });
    }

    try {
      await db.query(`DELETE FROM voices WHERE voice_id = $1`, [voiceId]);
      return res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ error: "Failed to delete the post." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
