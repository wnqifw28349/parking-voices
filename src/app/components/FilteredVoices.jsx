'use client';
import { useState } from 'react';
import ActiveVoices from './ActiveVoices';

export default function PostsPage({ filteredVoices }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter voicess by category
  const filteredVoicesResult =
    selectedCategory === 'All'
      ? filteredVoices
      : filteredVoices.filter(voice => voice.category === selectedCategory);
  console.log('These are the filteredVoices data', filteredVoices);
  function buildCommentTree(comments, parentCommentId = null) {
    return comments
      .filter(comment => comment.parent_comment_id === parentCommentId)
      .map(comment => ({
        ...comment,
        replies: buildCommentTree(comments, comment.comment_id),
      }));
  }
  return (
    <div>
      {/* Category Selector */}
      <div>
        <label htmlFor="category" className="text-lg font-bold text-purple-700">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={event => setSelectedCategory(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Driving">Driving</option>
          <option value="Fines">Fines</option>
          <option value="Parking">Parking</option>
          <option value="PLAC">PLAC</option>
        </select>
      </div>

      {/* Render Filtered Posts */}
      <div className="space-y-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
        {filteredVoicesResult.map(voice =>
          // Build the nested comment tree for the current voice
          {
            const nestedComments = buildCommentTree(voice.comments);
            console.log('data for nestedComment', nestedComments);
            return (
              <div key={voice.voice_id}>
                <ActiveVoices voice={voice} nestedComments={nestedComments} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
