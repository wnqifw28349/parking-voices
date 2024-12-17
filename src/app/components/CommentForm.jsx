import { db } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function CommentForm({
  voiceId,
  parentCommentId = null,
  onCommentPosted,
}) {
  async function handleCommentSubmit(formData) {
    "use server";

    // Get current user
    const user = await currentUser();

    if (!user || !user.id) {
      throw new Error("User is not authenticated");
    }

    // Clerk user ID
    const clerkId = user.id;

    // Fetch the user from your database
    const userQuery = `SELECT * FROM users WHERE users.clerk_id = $1`;
    const userRes = await db.query(userQuery, [clerkId]);
    const dbUser = userRes.rows[0];

    if (!dbUser) {
      throw new Error("User not found in the database");
    }

    // Extract form data
    const user_id = dbUser.user_id;
    const content = formData.get("content");

    if (!content) {
      throw new Error("Comment content cannot be empty");
    }

    // Insert comment into the database
    const query = `
      INSERT INTO comments (voice_id, user_id, content, parent_comment_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [voiceId, user_id, content, parentCommentId];
    await db.query(query, values);

    // Revalidate the page to fetch the updated comments
    revalidatePath(`/voices/${voiceId}`);
  }

  return (
    <form action={handleCommentSubmit} className="space-y-2 mt-4">
      <textarea
        name="content"
        placeholder="Write your comment..."
        className="w-full border rounded p-2"
        rows="3"
        required
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}
