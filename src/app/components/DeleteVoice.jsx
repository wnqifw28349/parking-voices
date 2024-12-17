"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function deleteVoice(voiceId) {
  try {
    const result = await db.query(
      `DELETE FROM voices WHERE voice_id = $1 RETURNING *`,
      [voiceId]
    );
    console.log("Delete result:", result);
    revalidatePath("/profile");
    revalidatePath("/voices");
    revalidatePath("/voices/[id]");
    return result;
  } catch (error) {
    console.error("Failed to delete deed:", error);
  }
}
