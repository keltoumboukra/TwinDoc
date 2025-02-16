import { createId } from "@paralleldrive/cuid2"
import { createCookie, redirect } from "@remix-run/node";

type AuthUserType = {
  userId: string,
  email: string,
  password: string,
}

type AuthErrorType = {
  error: string,
}

const authData = { secret: process.env.COOKIE_SECRET || "default" };
if (authData.secret === "default") {
  console.warn("No COOKIE_SECRET set, the app is not secured")
  authData.secret = "default-secret"
}

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  sameSite: 'lax',
  secrets: [authData.secret],
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 30, // 30 days
})

export async function authenticateAccount(email: string, password: string) {
  const userId = createId();
  if (email === "atul@practica.health" && password === "12345") {
    return { userId, email, password }
  }
  return { error: "Invalid email or password." }
} 

export async function createAccount(email: string, password: string) {
  return {userId: createId(), email, password}
}

export async function getAuthFromRequest(request: Request): Promise<string | null> {
  const cookie = request.headers.get("Cookie");
  const userId = await authCookie.parse(cookie);
  return userId ?? null;
}

export async function requireAuthCookie(request: Request) {
  const userId = await authCookie.parse(request.headers.get("Cookie"));
  if (!userId) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": await authCookie.serialize("", {
          maxAge: 0
        }),
      },
    })
  }
  return userId;
}
