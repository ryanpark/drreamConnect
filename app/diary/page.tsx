import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import DreamLists from "@/components/diary/DreamLists";
import DiaryForm from "@/components/diary/DiaryForm";

export default async function Diary() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: dreams, error } = await supabase
    .from("dreams")
    .select("*")
    .eq("email", user?.email);

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>Dream Diary</h1>

          <DreamLists dreams={dreams ?? []} />
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="content">dream</Label>
            <DiaryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
