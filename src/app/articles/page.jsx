import Link from "next/link";
import { db } from "@/utils/db";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default async function Articles(voiceId) {
  // Fetch articles from the database
  const articlesQuery = `
    SELECT *
    FROM articles
    ORDER BY id DESC;
  `;
  const artResponse = await db.query(articlesQuery);
  const articles = artResponse.rows;
  console.log(articles);

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h2 className="text-1xl font-bold mb-4 inline-block text-left w-full p-1 bg-green-600 text-[#022a22]">
        Long Form Articles
      </h2>
      <ul className="space-y-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
        {articles.map((article) => (
          <li
            key={article.id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <Card className="bg-[#BDE8CA]">
              {/* Article Image */}
              <CardHeader className="flex items-center justify-center bg-[#F9E6CF] p-4"></CardHeader>
              {/* Article Title */}
              <CardTitle className="p-4 text-center text-xl font-semibold text-gray-800">
                {article.Title}
              </CardTitle>
              {/* Article Content */}
              <CardContent className="p-6 text-gray-700">
                <div>
                  {article.image_url && (
                    <img
                      src={article.image - url}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-md z-10"
                    />
                  )}
                </div>
                <div>
                  <p>{article.content}</p>
                </div>
              </CardContent>
              {/* Author Info */}
              <CardFooter className="flex items-center justify-between bg-[#EF6D6D] text-white p-4 rounded-b-md">
                <p className="text-sm font-medium">Author: {article.Author}</p>
                <Link
                  href={`/articles/${article.id}`}
                  className="text-sm font-bold text-[#022a22] hover:underline"
                >
                  Read More
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
