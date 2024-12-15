import React from "react";
import InteractionIcons from "@/app/components/InteractionIcon";
import { db } from "@/utils/db";

export default async function VoiceOfDay() {
  const response = await db.query(`
        SELECT * FROM voices
        WHERE created_at >= NOW() - INTERVAL '1 month'
        ORDER BY amplifiers_count DESC
        LIMIT 1`);
  const data = response.rows;

  console.log("The voice of the day day data", data);

  return (
    <div>
      <div className="container mx-auto max-w-4xl ">
        <h3 className="text-xl font-bold text-800 mb-4 text-lime-400 text-center">
          Voice of the Day: {data.username}
        </h3>
        <p className="text-orange-700">{data.content || "testdata of void"}</p>
      </div>
      <InteractionIcons username={data.username} />
    </div>
  );
}
