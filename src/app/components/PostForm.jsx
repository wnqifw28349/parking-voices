import { db } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function PostForm() {
  const { categories, locations } = await fetchCategoriesAndLocations();

  async function fetchCategoriesAndLocations() {
    const categoriesQuery = `SELECT * FROM categories`;
    const locationsQuery = `SELECT * FROM locations ORDER BY location_name ASC`;

    const [categoriesRes, locationsRes] = await Promise.all([
      db.query(categoriesQuery),
      db.query(locationsQuery),
    ]);

    return {
      categories: categoriesRes.rows,
      locations: locationsRes.rows,
    };
  }

  async function handlePostSubmit(formData) {
    "use server";

    // Get current user
    const user = await currentUser();

    if (!user || !user.id) {
      throw new Error("User is not authenticated");
    }

    // Clerk user ID
    const clerkId = user.id;

    // Fetch the user from your database
    const userQuery = `SELECT * FROM users WHERE users.clerk_id = $1`;
    const userRes = await db.query(userQuery, [clerkId]);
    const dbUser = userRes.rows[0];

    if (!dbUser) {
      throw new Error("User not found in the database");
    }

    // Extract form data
    const user_id = dbUser.user_id;
    const content = formData.get("content");
    const category = formData.get("category");
    const location = formData.get("location");

    if (!content || !category || !location) {
      throw new Error("Invalid input data");
    }

    // Insert into voices table
    const query = `
      INSERT INTO voices (user_id, content, category, location)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    await db.query(query, [user_id, content, category, location]);

    // Revalidate the page cache
    revalidatePath("/voices");
  }

  return (
    <div className="bg-purple-100 py-6 px-4 rounded-lg shadow-md sticky bottom-0 max-w-lg mx-auto w-full">
      <h3 className="text-lg font-bold text-purple-900 mb-4">New Voice</h3>
      <form action={handlePostSubmit} className="space-y-4">
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
              <option key={category.category_id} value={category.category_name}>
                {category.category_name}
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
              <option key={location.location_id} value={location.location_name}>
                {location.location_name}
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
