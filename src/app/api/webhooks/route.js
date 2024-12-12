import { Webhook } from "svix";
import { db } from "@/utils/db";

export async function POST(req) {
  const signingSecret = process.env.SIGNING_SECRET || "your-secret";

  // Get headers
  const svix_id = req.headers.get("svix-id") || "";
  const svix_timestamp = req.headers.get("svix-timestamp") || "";
  const svix_signature = req.headers.get("svix-signature") || "";

  // Get body
  const body = await req.text();

  const svix = new Webhook(signingSecret);

  let msg;

  // Verify the payload
  try {
    msg = svix.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Bad Request", { status: 400 });
  }

  console.log("Webhook verified:", msg);

  // Extract id, username, and email_address
  const { id, username, email_addresses } = msg.data;

  if (!id || !username) {
    console.error("Missing id or username in webhook payload");
    return new Response("Bad Request: Missing required fields", {
      status: 400,
    });
  }

  // Extract email_address from the email_addresses array
  const email = email_addresses?.[0]?.email_address;

  if (!email) {
    console.error("Missing email_address in webhook payload");
    return new Response("Bad Request: Missing email_address", {
      status: 400,
    });
  }

  if (msg.type === "user.created") {
    try {
      // Insert into database
      const result = await db.query(
        `INSERT INTO users (clerk_id, username, email)
       VALUES ($1, $2, $3)
       RETURNING *;`,
        [id, username, email]
      );

      console.log("Inserted user into database:", result.rows[0]);
    } catch (err) {
      console.error("Database insertion failed:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
