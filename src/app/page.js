import PostVoicesClient from '../components/PostVoicesClient';
import Voiceoftheday from '@/app/components/Voiceoftheday';
import Link from 'next/link';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import VoiceOfDay from './components/VoiceOfDay';
// import { auth } from '@clerk/nextjs/server';

export default function Home() {
  return (
    <ClerkProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 mb-4 hover:shadow-lg transition font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center justify-items-center sm:items-start">
          {/* Uncomment Herocard if needed */}
          {/* <Herocard className="flex gap-4 items-center flex-col sm:flex-row" /> */}
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
            <VoiceOfDay />
            {/* <UserPosts /> */}
          </div>
          <SignedIn>
            <PostVoicesClient />
          </SignedIn>

          <SignedOut>
            <SignedIn />
          </SignedOut>
        </main>
      </div>
    </ClerkProvider>
  );
}
