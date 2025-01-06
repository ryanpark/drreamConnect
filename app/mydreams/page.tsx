import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DreamLists from "@/components/diary/DreamLists";

export default async function Mydreams() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: dreams, error } = await supabase
    .from("dreams")
    .select("*")
    .eq("email", user?.email)
    .order("created_at", { ascending: false });

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>My dreams</h1>
          <Button>
            <Link href={"/diary"}> Log your dream </Link>
          </Button>
          <DreamLists dreams={dreams ?? []} />
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="content">dream</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
