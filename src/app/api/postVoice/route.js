import { handlePostVoices } from "../../components/PostVoicesServer";

// Handle POST request
export async function POST(req) {
  try {
    const { formData, username } = await req.json(); // Parse the request body

    // Ensure formData is valid
    if (!formData || !username) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Convert formData to Map if necessary
    const formDataMap = new Map(Object.entries(formData));

    // Call your function to process the request
    const result = await handlePostVoices(formDataMap, username);

    if (result.error) {
      return new Response(JSON.stringify(result), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error posting voice:", err);
    return new Response(JSON.stringify({ error: "Failed to post voice." }), {
      status: 500,
    });
  }
}
