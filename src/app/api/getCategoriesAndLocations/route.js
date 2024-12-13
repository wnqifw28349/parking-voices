import { fetchCategoriesAndLocations } from "../../../components/PostVoicesServer";

export async function GET(req) {
  try {
    const data = await fetchCategoriesAndLocations();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories or locations:", error);
    return new Response(
      JSON.stringify({ error: "Failed to load categories or locations." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
