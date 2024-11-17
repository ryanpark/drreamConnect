import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveDiary } from "@/app/actions";

export default async function Diary() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>Dream Diary</h1>

          <form className="flex-1 flex flex-col min-w-64">
            <h1 className="text-2xl font-medium">Write your dream</h1>

            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="content">dream</Label>
              <Input name="title" placeholder="title" />
              <textarea name="dream" placeholder="write your dream" />

              <SubmitButton pendingText="Saving..." formAction={saveDiary}>
                Submit
              </SubmitButton>
              {/* Facebook Sign-Up Button */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
