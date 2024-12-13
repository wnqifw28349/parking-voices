"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function PostVoicesClient() {
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch categories and locations on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getCategoriesAndLocations");
        if (!res.ok) throw new Error("Failed to fetch data.");
        const data = await res.json();
        setCategories(data.categories || []);
        setLocations(data.locations || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load categories or locations.");
      }
    }
    fetchData();
  }, []);

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = user?.username;
    // || user?.emailAddress || "Anonymous"

    try {
      const res = await fetch("/api/postVoice", {
        method: "POST",
        body: JSON.stringify({
          formData: Object.fromEntries(formData.entries()),
          username,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (result.success) {
        setSuccess("Voice posted successfully!");
        setError(null);
      } else {
        setError(result.error || "Failed to post voice.");
        setSuccess(null);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form.");
      setSuccess(null);
    }
  }

  return (
    <div className="bg-purple-100 py-6 px-4 rounded-lg shadow-md sticky bottom-0 max-w-lg mx-auto w-full">
      <h3 className="text-lg font-bold text-purple-900 mb-4">New Voice</h3>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Content Input */}
        <textarea
          name="content"
          placeholder="Raise your voice"
          className="w-full h-15 p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
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
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location:
          </label>
          <select
            id="location"
            name="location"
            className="w-full bg-white border border-purple-300 text-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          >
            <option value="" disabled>
              Select a location
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Post Voice
        </button>
      </form>
    </div>
  );
}
