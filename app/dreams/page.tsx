import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Comments } from "@/components/comments/Comments";
import * as Dialog from "@radix-ui/react-dialog";
import { CircleX } from "lucide-react";
import Avatar from "@/components/avatar/Avatar";
import Image from "next/image";

interface DreamType {
  title: string;
  content: string;
  date: string;
  tags?: string[];
  images?: string;
  nickname: string;
  id: number;
  comments: CommentType[];
  avatar?: string;
}

interface CommentType {
  comment: string;
  nickname: string;
  avatar: string;
}

export default async function Diary() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: dreams, error } = await supabase
    .from("dreams")
    .select("*")
    .eq("public", true)
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
    <div className="flex-1 w-full flex flex-col gap-12 p-4">
      <div className="flex flex-col items-center justify-center mb-10">
        <div>
          <Image src="/mirror.png" alt="girl" width={392} height={392} />
        </div>
        <h1 className="text-2xl text-center m-10">
          Dive Into a Universe of Shared Dreams - What Will You Uncover?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
              avatar,
            } = dreams;

            return (
              <div key={id} className="p-4 rounded-md bg-darkPurple shadow-md">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="w-full bg-violet4 text-violet11 rounded hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 text-left">
                      <div className="p-4">
                        <div className="flex items-center mb-4">
                          <Avatar
                            avatar={avatar}
                            visible
                            nickname={nickname}
                            size={55}
                          />
                          <div className="ml-3 text-sm text-gray-light">
                            {nickname}
                          </div>
                        </div>
                        <div>
                          <strong>{title}</strong>
                          <div
                            className="mt-2 text-ellipsis overflow-hidden max-h-96"
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        </div>
                        {tags && tags?.length > 0 && (
                          <div className="mt-4 flex flex-wrap">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="mr-2 mb-2 bg-secondary-purple px-2 py-1 rounded text-yellow text-sm"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="bg-darkPurple fixed inset-0 bg-blackA6" />
                    <Dialog.Content className="fixed inset-0 w-full h-full bg-gray1 p-5 shadow-lg focus:outline-none">
                      <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-gray-300">
                          <h2 className="text-xl font-semibold">{title}</h2>
                          <Dialog.Close asChild>
                            <button
                              className="size-[30px] rounded-full bg-gray3 text-violet11 hover:bg-violet4 focus:outline-none focus:ring-2 focus:ring-violet7"
                              aria-label="Close"
                            >
                              <CircleX />
                            </button>
                          </Dialog.Close>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-5">
                          <div className="flex items-center mb-4">
                            <Avatar
                              avatar={avatar}
                              visible
                              nickname={nickname}
                              size={40}
                            />
                            <div className="ml-3">
                              <div className="font-semibold">{nickname}</div>
                              <div className="text-sm text-gray-light">
                                {date}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <div
                              className="mt-2"
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          </div>
                          {tags && tags?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {tags.map((tag) => (
                                <Badge key={tag} className="mr-2">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {images && (
                            <div className="mt-4">
                              <img
                                src={images}
                                alt={title}
                                className="rounded-md max-w-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <Comments id={id} comments={comments} user={user} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
