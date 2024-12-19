import Link from 'next/link';
import AmpButtons from './AmpButtons';
import DeleteVoiceButton from './DeleteVoiceButton';

export default function ActiveVoices({ voice, nestedComments }) {
  return (
    <div
      key={voice.voice_id}
      className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
    >
      <div>
        <p>{voice.username} voiced:</p>
        <Link href={`/voices/${voice.voice_id}`}>
          <h3 className="text-lg font-semibold text-gray-700">
            {voice.content}
          </h3>
        </Link>
        <p className="text-xs text-gray-400">Category: {voice.category}</p>
        <p className="text-xs text-gray-400 mb-4">Location: {voice.location}</p>
        <div>
          <AmpButtons voiceId={voice.voice_id} />
        </div>
        <div>
          <DeleteVoiceButton voiceId={voice.voice_id} />
        </div>
      </div>

      {/* Comments Section */}
      {nestedComments.length > 0 && (
        <details className="group mt-4">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
            {nestedComments.length} Comment
            {nestedComments.length > 1 ? 's' : ''}
          </summary>
          <ul className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2">
            {nestedComments.map(comment => (
              <div key={comment.comment_id}>
                <CommentItem comment={comment} />
              </div>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
// Recursive component for rendering comments and nested replies
function CommentItem({ comment }) {
  return (
    <li className="text-sm text-gray-600">
      <p>
        <strong className="font-medium text-gray-800">
          {comment.username}
        </strong>
        : {comment.content}
      </p>
      {/* {comment.replies.length > 0 && (
        <ul className="mt-2 pl-4 border-l-2 border-gray-300 space-y-2">
          {comment.replies.map(reply => (
            <CommentItem key={reply.comment_id} comment={reply} />
          ))}
        </ul>
      )} */}
    </li>
  );
}
