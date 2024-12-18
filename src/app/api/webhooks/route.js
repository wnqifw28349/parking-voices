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
  const { id, username, email_addresses, image_url } = msg.data;

  if (!id || !username) {
    console.error("Missing id or username in webhook payload");
    return new Response("Bad Request: Missing required fields", {
      status: 400,
    });
  }

  // Extract email_address from the email_addresses array
  const email = email_addresses?.[0]?.email_address;

  if (msg.type === "user.created") {
    if (!username || !email) {
      console.error(
        "Missing username or email_address in user.created payload"
      );
      return new Response("Bad Request: Missing required fields", {
        status: 400,
      });
    }

    try {
      // Insert into database
      const result = await db.query(
        `INSERT INTO users (clerk_id, username, email, profile_image)
         VALUES ($1, $2, $3, $4)
         RETURNING *;`,
        [id, username, email, image_url]
      );

      console.log("Inserted user into database:", result.rows[0]);
    } catch (err) {
      console.error("Database insertion failed:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else if (msg.type === "user.updated") {
    if (!username || !email) {
      console.error(
        "Missing username or email_address in user.updated payload"
      );
      return new Response("Bad Request: Missing required fields", {
        status: 400,
      });
    }

    try {
      // Update the database record
      const result = await db.query(
        `UPDATE users
         SET username = $1, email = $2, profile_image = $3
         WHERE clerk_id = $4
         RETURNING *;`,
        [username, email, image_url, id]
      );

      console.log("Updated user in database:", result.rows[0]);
    } catch (err) {
      console.error("Database update failed:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else if (msg.type === "user.deleted") {
    try {
      // Delete the user from the database
      const result = await db.query(
        `DELETE FROM users
         WHERE clerk_id = $1
         RETURNING *;`,
        [id]
      );

      console.log("Deleted user from database:", result.rows[0]);
    } catch (err) {
      console.error("Database deletion failed:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else {
    console.log("Unhandled webhook event type:", msg.type);
    return new Response("OK", { status: 200 });
  }

  return new Response("OK", { status: 200 });
}
