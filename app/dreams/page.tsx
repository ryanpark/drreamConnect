import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
interface DreamType {
  title: string;
  content: string;
  date: string;
  tags?: string[];
  images?: string;
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

  console.log(shuffledDreams);
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>Explore Dreams</h1>
          {shuffledDreams.map((dreams: DreamType) => {
            const { title, content, date, tags, images } = dreams;
            return (
              <div className="p-4">
                <p>{date}</p>
                <p>title : {title}</p>
                <p>
                  content :{" "}
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </p>
                <div>
                  {tags?.map((tag, index) => (
                    <Badge key={index} className="mr-2">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {images && (
                  <p>
                    <img src={images} alt={images} />
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
