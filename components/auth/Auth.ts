import { createClient } from "@/utils/supabase/server";

async function SignInWithFacebook() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });
}

export default SignInWithFacebook;
