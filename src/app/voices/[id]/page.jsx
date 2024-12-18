import { redirect } from "next/navigation";
import { db } from "@/utils/db";
import CommentForm from "@/app/components/CommentForm";
import { currentUser } from "@clerk/nextjs/server";
import DeleteVoiceButton from "@/app/components/DeleteVoiceButton";
import { delay } from "@/app/components/Delay";

export default async function singleVoicePage({ params }) {
  const { id } = await params;
  const session = await currentUser();
  let clerkId;
  if (session) {
    clerkId = session.id;
  }

  async function fetchVoiceAndComments(voiceId) {
    const voicesQuery = `
      SELECT 
        voices.voice_id,
        voices.content,
        voices.category,
        voices.location,
        voices.amplifiers_count,
        voices.created_at,
        users.username,
        users.clerk_id
      FROM voices
      LEFT JOIN users ON voices.user_id = users.user_id
      WHERE voices.voice_id = $1;
    `;

    const voiceResult = await db.query(voicesQuery, [voiceId]);
    const voice = voiceResult.rows[0];

    const comments = await fetchComments(voiceId);
    return { voice, comments };
  }

  async function fetchComments(voiceId, parentCommentId = null) {
    const commentQuery = `
      SELECT 
        comments.comment_id, 
        comments.content, 
        comments.parent_comment_id, 
        users.username 
      FROM comments 
      JOIN users ON comments.user_id = users.user_id 
      WHERE comments.voice_id = $1 
        AND comments.parent_comment_id ${parentCommentId ? `= $2` : `IS NULL`}
      ORDER BY comments.created_at ASC;
    `;

    const commentArgs = [voiceId];
    if (parentCommentId) {
      commentArgs.push(parentCommentId);
    }

    const commentsResult = await db.query(commentQuery, commentArgs);
    const comments = commentsResult.rows;

    for (const comment of comments) {
      comment.replies = await fetchComments(voiceId, comment.comment_id);
    }

    return comments;
  }

  const { voice, comments } = await fetchVoiceAndComments(id);

  if (!voice) {
    await delay(3000);
    redirect("/voices");
  }

  function Comment({ comment, voiceId }) {
    return (
      <li key={comment.comment_id} className="text-sm text-gray-600">
        <p>
          <strong className="font-medium text-gray-800">
            {comment.username}
          </strong>
          : {comment.content}
        </p>
        {comment.replies && comment.replies.length > 0 && (
          <ul className="pl-4 border-l-2 border-gray-200 space-y-2">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.comment_id}
                comment={reply}
                voiceId={voiceId}
              />
            ))}
          </ul>
        )}

        {/* Reply Form */}
        <details>
          <summary className="text-blue-500 cursor-pointer mt-2">Reply</summary>
          <CommentForm voiceId={voiceId} parentCommentId={comment.comment_id} />
        </details>
      </li>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition max-h-50">
      <div>
        <p>{voice.username} voiced:</p>
        <h3 className="text-lg font-semibold text-gray-700">{voice.content}</h3>
        <p className="text-sm text-gray-400">Category: {voice.category}</p>
        <p className="text-sm text-gray-400 mb-4">Location: {voice.location}</p>
        {clerkId && clerkId === voice.clerk_id && (
          <DeleteVoiceButton voiceId={voice.voice_id} />
        )}
      </div>
      <details className="group">
        <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
          Comments
        </summary>
        <ul className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2">
          {comments.map((comment) => (
            <Comment
              key={comment.comment_id}
              comment={comment}
              voiceId={voice.voice_id}
            />
          ))}
        </ul>
      </details>

      {/* Top-Level Comment Form */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-gray-800 mb-2">Add a Comment</h4>
        <CommentForm voiceId={voice.voice_id} />
      </div>
    </div>
  );
}
