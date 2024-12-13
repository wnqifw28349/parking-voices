import { getAuth } from "@clerk/nextjs/server";

// Middleware to verify the user
export async function authenticateRequest(req, res, next) {
  try {
    // Get the authenticated user's information
    const { userId, sessionId } = getAuth(req);

    if (!userId || !sessionId) {
      return res
        .status(401)
        .json({ error: "Unauthorized access. Please log in." });
    }

    // Pass user information to the next middleware or route handler
    req.userId = userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Authentication failed." });
  }
}

// Helper function to protect API routes
export const withAuth = (handler) => async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    return handler(req, res);
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
