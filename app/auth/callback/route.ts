import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code"); // For OAuth flows
  const token = searchParams.get("token"); // For email confirmation
  const type = searchParams.get("type"); // e.g., 'signup'

  const supabase = await createClient();
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      }
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    } else {
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
    if (error || !session) {
      console.error("Session error:", error?.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
  }

  // Redirect to the desired page
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}/`);
  }
  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}/nick-name`);
  }
  return NextResponse.redirect(`${origin}/nick-name`);
}
