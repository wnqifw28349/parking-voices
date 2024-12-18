import { db } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import AmpButtons from "./AmpButtons";

// Get existing amplifier record
async function getExistingAmp(userId, voiceId) {
  if (!userId) return null;

  const { rows: existingAmps } = await db.query(
    "SELECT * FROM Amplifiers WHERE user_id = $1 AND voice_id = $2 LIMIT 1",
    [userId, voiceId]
  );

  return existingAmps?.[0];
}

// Handle toggling amp (amplify or remove amplification)
async function handleAmp(userId, voiceId) {
  if (!userId) {
    throw new Error("Cannot amplify without being logged in");
  }

  const existingAmp = await getExistingAmp(userId, voiceId);

  if (existingAmp) {
    // Remove the existing amp
    await db.query("DELETE FROM Amplifiers WHERE amplifier_id = $1", [
      existingAmp.amplifier_id,
    ]);
    await db.query(
      "UPDATE voices SET amplifiers_count = amplifiers_count - 1 WHERE voice_id = $1",
      [voiceId]
    );
  } else {
    // Add a new amp
    await db.query(
      "INSERT INTO Amplifiers (user_id, voice_id) VALUES ($1, $2)",
      [userId, voiceId]
    );
    await db.query(
      "UPDATE voices SET amplifiers_count = amplifiers_count + 1 WHERE voice_id = $1",
      [voiceId]
    );
  }

  revalidatePath(`/voice/${voiceId}`);
}

// Server component for amplification
export async function Amp({ voiceId, amplifiersCount }) {
  // Get the logged-in user's Clerk ID
  const session = await currentUser();
  const clerkId = session?.id;

  // Fetch the corresponding user from your database if signed in
  let userId = null;
  if (clerkId) {
    const userQuery = `SELECT * FROM users WHERE users.clerk_id = $1`;
    const userRes = await db.query(userQuery, [clerkId]);
    const dbUser = userRes.rows[0];

    if (dbUser) {
      userId = dbUser.user_id;
    }
  }

  // Check if the user has already amplified this voice
  const existingAmp = userId ? await getExistingAmp(userId, voiceId) : null;

  async function toggleAmp() {
    "use server";
    if (!userId) {
      throw new Error("You must be signed in to amplify a voice.");
    }
    await handleAmp(userId, voiceId);
  }

  return (
    <form>
      <AmpButtons
        toggleAmp={toggleAmp}
        amplifiersCount={amplifiersCount}
        existingAmp={existingAmp}
        isSignedIn={!!userId} // Pass whether the user is signed in
      />
    </form>
  );
}
