import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface DreamType {
  title: string;
  content: string;
}
export default async function Diary() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: dreams, error } = await supabase
    .from("dreams")
    .select("*")
    .order("created_at", { ascending: false });

  if (!user) {
    return redirect("/sign-in");
  }

  const uniqueDreams = Object.values(
    dreams?.reduce((acc, dream) => {
      if (!acc[dream.email]) {
        acc[dream.email] = dream;
      }
      return acc;
    }, {})
  );

  const shuffledDreams = (uniqueDreams as DreamType[]).sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>Explore Dreams</h1>
          {shuffledDreams.map((dreams: DreamType) => {
            const { title, content } = dreams;
            return (
              <div>
                <p>title : {title}</p>
                <p>content : {content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
