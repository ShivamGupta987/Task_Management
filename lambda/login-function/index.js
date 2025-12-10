import jwt from "jsonwebtoken"
import crypto from "crypto"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// Mock user database (in production, use DynamoDB or RDS)
const mockUsers = {
  "user@example.com": {
    id: "user1",
    email: "user@example.com",
    password: hashPassword("password123"),
  },
  "demo@taskmanager.com": {
    id: "user2",
    email: "demo@taskmanager.com",
    password: hashPassword("demo123"),
  },
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex")
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash
}

export const handler = async (event) => {
  console.log("Login Lambda triggered:", event)

  // Handle CORS preflight
  if (event.requestContext.http.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  }

  try {
    if (event.requestContext.http.method !== "POST") {
      return {
        statusCode: 405,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "Method not allowed",
        }),
      }
    }

    const body = JSON.parse(event.body)
    const { email, password } = body

    if (!email || !password) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "Email and password are required",
        }),
      }
    }

    const user = mockUsers[email]

    if (!user || !verifyPassword(password, user.password)) {
      return {
        statusCode: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "Invalid email or password",
        }),
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    )

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
          },
        },
      }),
    }
  } catch (error) {
    console.error("Lambda error:", error)

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
    }
  }
}
