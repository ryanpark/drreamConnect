import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/submit-button";
import { postComments } from "@/app/actions";
import { Input } from "@/components/ui/input";

interface DreamType {
  title: string;
  content: string;
  date: string;
  tags?: string[];
  images?: string;
  nickname: string;
  id: number;
  comments: CommentType[];
}

interface CommentType {
  comment: string;
  nickname: string;
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

  const uniqueDreams = Object.values(
    (dreams || []).reduce((acc, dream) => {
      if (!acc[dream.email]) {
        acc[dream.email] = dream;
      }
      return acc;
    }, {})
  );
  const shuffledDreams = (uniqueDreams as DreamType[])?.sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>Explore Dreams</h1>
          {shuffledDreams.map((dreams: DreamType) => {
            const {
              title,
              content,
              date,
              tags,
              images,
              nickname,
              id,
              comments,
            } = dreams;

            return (
              <div className="p-4">
                <p>user: {nickname}</p>
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
                {comments?.map((comment: CommentType) => {
                  return (
                    <div>
                      {comment.comment} , {comment.nickname}
                    </div>
                  );
                })}

                <form>
                  <Input type="textarea" name="comments" />
                  <input type="hidden" name="dreamId" value={id} />

                  <SubmitButton formAction={postComments}>
                    Make comment
                  </SubmitButton>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
