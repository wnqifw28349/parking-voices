"use server";
import { db } from "@/utils/db";
import VoiceOfDay from "@/app/components/VoiceOfDay";

export default async function VodServer() {
  // Fetch the VOD
  const response = await db.query(`
    SELECT  * FROM voices
    WHERE voices.created_at >= NOW() - INTERVAL '1 month'
    ORDER BY voices.amplifiers_count DESC
    LIMIT 1;
  `);
  const data = response.rows[0];

  console.log("The voice of the day data", data);

  return (
    <div>
      {/* Pass the data to the client component */}
      <VoiceOfDay data={data} />
    </div>
  );
}
