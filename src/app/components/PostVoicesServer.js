"use server";
import { db } from "@/utils/db";

export async function handlePostVoices(formData, username) {
  const content = formData.get("content");
  const category = formData.get("category");
  const location = formData.get("location");

  try {
    await db.query(
      `INSERT INTO voices (username, content, category, location) VALUES ($1, $2, $3, $4)`,
      [username, content, category, location]
    );
    console.log("Voice successfully posted.");
    return { success: true };
  } catch (err) {
    console.error("Error posting voice:", err);
    return { error: "Failed to post voice." };
  }
}

export async function fetchCategoriesAndLocations() {
  try {
    const categoriesResult = await db.query(
      `SELECT category_id, category_name FROM categories`
    );
    const locationsResult = await db.query(
      `SELECT location_id, location_name FROM locations`
    );

    return {
      categories: categoriesResult.rows.map((row) => ({
        id: row.id,
        name: row.category_name,
      })),
      locations: locationsResult.rows.map((row) => ({
        id: row.id,
        name: row.location_name,
      })),
    };
  } catch (err) {
    console.error("Error fetching categories or locations:", err);
    throw new Error("Failed to load categories or locations.");
    console.log("error");
  }
}
