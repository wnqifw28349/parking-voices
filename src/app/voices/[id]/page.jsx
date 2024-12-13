import Link from "next/link";
import { db } from "@/utils/db";

export default async function singleVoicePage({ params }) {
  const { id } = await params;

  async function fetchVoiceAndComments(voiceId) {
    const voicesQuery = `
      SELECT 
        voices.voice_id,
        voices.content,
        voices.category,
        voices.location,
        voices.amplifiers_count,
        voices.created_at,
        users.username
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
    return <p>Voice not found.</p>;
  }

  function Comment({ comment }) {
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
              <Comment key={reply.comment_id} comment={reply} />
            ))}
          </ul>
        )}
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
      </div>
      <details className="group">
        <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
          Comments
        </summary>
        <ul className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2">
          {comments.map((comment) => (
            <Comment key={comment.comment_id} comment={comment} />
          ))}
        </ul>
      </details>
    </div>
  );
}