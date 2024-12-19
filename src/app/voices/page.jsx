import Link from 'next/link';
import { db } from '@/utils/db';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import PostForm from '@/app/components/PostForm';
import AmpButtons from '../components/AmpButtons';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './accordionStyles.css';
// import DeleteVoiceButton from '../components/DeleteVoiceButton';
import FilteredVoices from '@/app/components/FilteredVoices';

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
      COALESCE(jsonb_agg(
        DISTINCT jsonb_build_object(
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

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h2 className="text-1xl font-bold mb-4 inline-block text-left w-full p-1 bg-green-600 text-[#022a22]">
        Active Voices
      </h2>
      <FilteredVoices
        filteredVoices={voices}
        username={voices.username}
        voice_id={voices.voice_id}
      />

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
