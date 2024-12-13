import React from 'react';
import { db } from '@/utils/db';

export default function PostVoices(currentUserObj) {
  async function handlePostVoices(formData) {
    'use server';
    const username = formData.get('username');
    const content = formData.get('content');
    const category = formData.get('category');
    const location = formData.get('location');
    // const defaultUsername = { currentUserObj, username };
    await db.query(
      `INSERT INTO voices (username, content, category, location) VALUES ($1,$2, $3, $4)`,
      [username, content, category, location]
    );
    // await db.query(`INSERT INTO users (username) VALUES ($1)`, [username]);
    try {
      const result = await db.query(
        `Select id, category_name FROM categories `
      );
      const cat = result.rows.map(row => ({
        id: row.id,
        name: row.category_name,
      }));
      console.log({ cat });
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { error: 'Failed to fetch categories.' };
    }
  }

  return (
    <div
      className="bg-purple-100 py-6 px-4 rounded-lg shadow-md sticky bottom-0 max-w-lg mx-auto"
      style={{ bottom: '0', left: '0' }}
    >
      <h3 className="text-lg font-bold text-purple-900 mb-4">New Voice</h3>
      <form action={handlePostVoices} className="space-y-4">
        {/* Username Input */}
        <textareas
          name="username"
          placeholder="Username"
          className="w-full h-10 p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
          // defaultValue="{Input Username}"
          defaultValue="Sign in to Create User Name"
        ></textareas>

        {/* Content Input */}
        <textarea
          name="content"
          placeholder="Raise your voice"
          className="w-full h-10 p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        ></textarea>

        {/* Category Dropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="w-full bg-white border border-purple-300 text-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          >
            <option value="driving">Driving</option>
            <option value="parking">Parking</option>
            <option value="fines">Fines</option>
          </select>
        </div>

        {/* Location Input */}
        <textarea
          name="location"
          placeholder="Location"
          className="w-full h-15 p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          formAction={handlePostVoices}
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-2 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Voice It
        </button>
      </form>
    </div>
  );
}
