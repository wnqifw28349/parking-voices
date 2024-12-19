import { db } from "@/utils/db";
import PostForm from "@/app/components/PostForm";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import DeleteVoiceButton from "@/app/components/DeleteVoiceButton";
import { Amp } from "@/app/components/AmpVote";

export default async function UserPage({ params }) {
  //use the clerk Id to retrieve the user_id of the currently signed-in user
  const { userId } = await auth();
  let reqUserId;
  let userData;
  let currentUser;
  if (userId) {
    reqUserId = await db.query(
      `SELECT user_id, username FROM users WHERE clerk_id=$1`,
      [userId]
    );

    userData = reqUserId.rows[0];
    console.log("this is userData", userData);
    currentUser = userData.user_id;
  }

  //use the username from params to retrieve user_id of that user's profile
  const { username } = await params;
  const reqProfileId = await db.query(
    `SELECT user_id, username FROM users WHERE username = $1`,
    [username]
  );
  const profileData = reqProfileId.rows[0];
  const profileId = profileData.user_id; //user id of [username]'s profile

  //retrieve associated voices for the user's profile
  const resPosts = await db.query(
    `SELECT 
   voices.user_id,
   voices.voice_id,
   voices.content,
   voices.category,
   voices.location,
   voices.amplifiers_count,
   voices.created_at,
   COUNT (comments.parent_comment_id) AS comments_count,
   COALESCE(jsonb_agg(
        DISTINCT jsonb_build_object(
          'comment_id', comments.comment_id,
          'content', comments.content,
          'username', comment_users.username,
          'parent_comment_id', comments.parent_comment_id
        )
      ) FILTER (WHERE comments.comment_id IS NOT NULL), '[]') AS comments
FROM voices 
LEFT JOIN comments ON voices.voice_id = comments.voice_id
LEFT JOIN amplifiers ON voices.voice_id = amplifiers.voice_id
LEFT JOIN users AS comment_users ON comments.user_id = comment_users.user_id
GROUP BY voices.voice_id
HAVING voices.user_id = $1
ORDER BY voices.created_at DESC`,
    [profileId]
  );

  const voices = resPosts.rows;

  // Build a nested comment structure
  function buildCommentTree(comments, parentCommentId = null) {
    return comments
      .filter((comment) => comment.parent_comment_id === parentCommentId)
      .map((comment) => ({
        ...comment,
        replies: buildCommentTree(comments, comment.comment_id),
      }));
  }

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h2 className="text-1xl font-bold mb-4 inline-block text-left w-full p-1 bg-green-600 text-[#022a22]">
        {username}&apos;s Active Voices
      </h2>
      <ul className="space-y-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
        {voices.map((voice) => {
          // Build the nested comment tree for the current voice
          const nestedComments = buildCommentTree(voice.comments);

          return (
            <li
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
                <p className="text-sm text-gray-400">
                  Category: {voice.category}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Location: {voice.location}
                </p>
                <div>
                  <Amp
                    voiceId={voice.voice_id}
                    amplifiersCount={voice.amplifiers_count}
                  />
                </div>
                {/* conditionally rendering the delete button */}
                <div>
                  <SignedIn>
                    {currentUser === profileId ? <DeleteVoiceButton /> : null}
                  </SignedIn>
                </div>
              </div>

              {/* Comments Section */}
              {nestedComments.length > 0 && (
                <details className="group mt-4">
                  <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                    {nestedComments.length} Comment
                    {nestedComments.length > 1 ? "s" : ""}
                  </summary>
                  <ul className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2">
                    {nestedComments.map((comment) => (
                      <CommentItem key={comment.comment_id} comment={comment} />
                    ))}
                  </ul>
                </details>
              )}
            </li>
          );
        })}
      </ul>
      {/* Accordion Component for "Raise your voice" */}
      <SignedIn>
        <Accordion.Root
          type="single"
          collapsible
          className="relative w-full rounded-md bg-purple-100 shadow-md mt-6"
        >
          <Accordion.Item value="raise-voice" className="relative">
            <Accordion.Header>
              <Accordion.Trigger className="group flex items-center justify-between w-full px-4 py-2 text-lg font-bold bg-purple-300 text-purple-900 hover:bg-purple-400 rounded-md shadow-md">
                <span>Raise your voice</span>
                <ChevronDownIcon className="transform transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="AccordionContent bg-purple-50 px-4 py-6">
              <PostForm />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </SignedIn>
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
      {comment.replies.length > 0 && (
        <ul className="mt-2 pl-4 border-l-2 border-gray-300 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.comment_id} comment={reply} />
          ))}
        </ul>
      )}
    </li>
  );
}
