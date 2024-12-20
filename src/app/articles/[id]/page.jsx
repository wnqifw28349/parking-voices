import { redirect } from "next/navigation";
import { db } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import DeleteVoiceButton from "@/app/components/DeleteVoiceButton";
import { delay } from "@/app/components/Delay";

export default async function singleArtPage({ params }) {
  const { id } = await params;
  const session = await currentUser();
  const clerkId = session.id;

  async function fetchVoiceAndComments(id) {
    const artQuery = `
      SELECT  *
    FROM articles
    WHERE articles.id=$1
    ORDER BY id DESC;
    `;

    const artResult = await db.query(artQuery, [id]);
    const art = artResult.rows[0];
    return { art };
  }

  const { art } = await fetchVoiceAndComments(id);

  if (!art) {
    await delay(3000);
    redirect("/articles");
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition max-h-50">
      <div>
        <p>{art.Author} voiced:</p>
        <p className="text-base text-gray-400 mb-4">Location: {art.Title}</p>
        <h3 className="text-lg font-semibold text-gray-700">{art.content}</h3>
        <p className="text-sm text-gray-400">Category: {art.tags}</p>
      </div>
      <details className="group">
        <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
          Commenting coming soon
        </summary>
      </details>
    </div>
  );
}
