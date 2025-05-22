import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code"); // For OAuth flows
  const token = searchParams.get("token"); // For email confirmation
  const type = searchParams.get("type"); // e.g., 'signup'
  const next = searchParams.get("next") ?? "/"; // Default to /welcome

  const supabase = await createClient();
  console.log(supabase);
  // Handle OAuth flow (e.g., Google, Apple, Discord)
  if (code && type !== "signup") {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("OAuth error:", error.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
  }

  // Handle email confirmation flow
  if (token && type === "signup") {
    // Supabase already verified the token before redirecting here
    // Optionally, check the session to confirm the user is signed in
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log(session);
    if (error || !session) {
      console.error("Session error:", error?.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
  }

  // Redirect to the desired page
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) {
    console.log("isLocalEnv");
    return NextResponse.redirect(`${origin}${next}`);
  }
  if (forwardedHost) {
    console.log("forwardedHost");
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  }
  console.log(origin);
  return NextResponse.redirect(`${origin}`);
}
