import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import MobileDropdownMenu from "@/components/menu/Menu";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: person, error } = await supabase
    .from("profile")
    .select("nick_name")
    .eq("email", user?.email)
    .single();

  if (error) {
    console.log(error);
  }

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <div>
          <Badge
            variant={"default"}
            className="font-normal pointer-events-none"
          >
            Please update .env.local file with anon key and url
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant={"outline"}
            disabled
            className="opacity-75 cursor-none pointer-events-none bg-yellow"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant={"default"}
            disabled
            className="opacity-75 cursor-none pointer-events-none"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  const MenuList = () => {
    return user ? (
      <div className="flex items-center gap-4 text-yellow">
        Hey, {person?.nick_name}!<Link href="/mydreams">My diary</Link>
        <Link href="/dreams">Explore dreams</Link>
        <Link href="/profile">Profile</Link>
        <form action={signOutAction}>
          <button type="submit">Sign out</button>
        </form>
      </div>
    ) : (
      <div className="flex gap-2 text-yellow flex items-center">
        <Link href="/dreams">Explore dreams</Link>
        <span className="animate-flash">●</span>{" "}
        <Link href="/sign-in">Sign in</Link>
      </div>
    );
  };

  return (
    <div>
      <div className="hidden md:block">
        <MenuList />
      </div>
      <div className="block md:hidden">
        <MobileDropdownMenu
          nick_name={person?.nick_name}
          isAuthenticated={!!user}
        />
      </div>
    </div>
  );
}
