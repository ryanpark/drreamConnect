import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
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
        <div className="p-5">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="mb-10">
              <Image src="/girl.png" alt="girl" width={377} height={377} />
            </div>
            <div>
              <h1 className="text-3xl mb-5 font-extralight">
                Capture Every Dream, Your Way
              </h1>
            </div>
            <p>
              Turn fleeting dreams into lasting memories with Dream Diary - your
              personal space to log, record, and relive every detail.
            </p>
            <div className="mt-10">
              <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                <Link href={"/diary"}> Log your dream </Link>
              </Button>
            </div>
          </div>
          <DreamLists dreams={dreams ?? []} />
        </div>
      </div>
    </div>
  );
}
