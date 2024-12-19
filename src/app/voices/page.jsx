import Link from "next/link";
import { db } from "@/utils/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PostForm from "@/app/components/PostForm";
import { Amp } from "../components/AmpVote";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "./accordionStyles.css";
import DeleteVoiceButton from "../components/DeleteVoiceButton";
import InteractionIcons from "../components/InteractionIcon";
import { FaSpinner } from "react-icons/fa";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { GiUltrasound } from "react-icons/gi";
import { PiUserSound } from "react-icons/pi";

export default async function Voices() {
  // Fetch voices with comments and nested replies
  const voicesQuery = `
    SELECT 
      voices.voice_id,
      voices.content,
      voices.category,
      voices.location,
      voices.amplifiers_count,
      voices.created_at,
      users.username,
      COALESCE(json_agg(
        json_build_object(
          'comment_id', comments.comment_id,
          'content', comments.content,
          'username', comment_users.username,
          'parent_comment_id', comments.parent_comment_id
        )
      ) FILTER (WHERE comments.comment_id IS NOT NULL), '[]') AS comments
    FROM voices
    LEFT JOIN users ON voices.user_id = users.user_id
    LEFT JOIN amplifiers ON voices.voice_id = amplifiers.voice_id
    LEFT JOIN comments ON voices.voice_id = comments.voice_id
    LEFT JOIN users AS comment_users ON comments.user_id = comment_users.user_id
    GROUP BY voices.voice_id, users.username
    ORDER BY voices.created_at DESC;
  `;

  const { rows: voices } = await db.query(voicesQuery);

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
      <h2 className="text-1xl font-bold mb-4 inline-block text-left w-full p-1 bg-[#0D7C66] text-[#022a22]">
        Active Voices
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
              <Card className="bg-[#BDE8CA]">
                <CardTitle className="flex items-center justify-between p-6 bg-[#F9E6CF] h-5">
                  <div>
                    <p className="text-xs flex xs:text-xs sm:text-sm text-green-600 items-center">
                      Category: {voice.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs flex xs:text-xs sm:text-sm text-green-600 items-center">
                      Location: {voice.location}
                    </p>
                  </div>
                </CardTitle>
                <CardContent className="flex items-center justify-center mt-2 bd-[#FAC67A] ">
                  <div>
                    <Link href={`/voices/${voice.voice_id}`}>
                      <h3 className="text-lg font-semibold justify-center text-gray-700">
                        {voice.content}
                      </h3>
                    </Link>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center ">
                  <div className="flex items-center justify-evenly rounded-full shadow-md bg-[#D7C3F1] w-full h-10">
                    <div className="flex-row justify-between">
                      <img
                        src="/logo.svg"
                        height={10}
                        weight={10}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                      />
                    </div>
                    <div>
                      <p className="flex text-xs xs:text-xs sm:text-sm lg:text-base">
                        {voice.username} 's voice
                      </p>
                      <Link href={`/voices/${voice.voice_id}`}></Link>
                    </div>
                    <div>
                      {/*<button className="flex items-center justify-center bg-[#022a22] text-white w-8 h-8 rounded-full shadow-md">
                        <span className="text-sm text-center font-semibold w-4 h-4 mr-0 mb-1 hover:text-[#c1a0e0]">
                          {voice.amplifiers_count}
                        </span>
                      </button>
                    </div> */}
                      <Amp
                        voiceId={voice.voice_id}
                        amplifiersCount={voice.amplifiers_count}
                      />
                    </div>
                    {/* <div>
                    <DeleteVoiceButton
                      voiceId={voice.voice_id}
                      h={5}
                      className="w-5 h-2"
                    />
                  </div> */}
                  </div>
                </CardFooter>
                <CardDescription className="p-6 mb-2">
                  {/* Comments Section */}
                  {nestedComments.length > 0 && (
                    <details className="group mt-4">
                      <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                        {nestedComments.length} Comment
                        {nestedComments.length > 1 ? "s" : ""}
                      </summary>
                      <ul className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2 bg-[#D7C3F1]">
                        {nestedComments.map((comment) => (
                          <CommentItem
                            key={comment.comment_id}
                            comment={comment}
                          />
                        ))}
                      </ul>
                    </details>
                  )}
                </CardDescription>
              </Card>
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
