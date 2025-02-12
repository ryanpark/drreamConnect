import { LockKeyhole, CircleX } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface DreamTypes {
  title: string;
  date: Date | null;
  content: string;
  dreamDate: Date | null;
  images: string[];
  tags: string[];
}

interface DreamListsProps {
  dreams: DreamTypes[];
}

export default function DreamLists({ dreams }: DreamListsProps) {
  if (!dreams?.length) return <div>No dreams available</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {dreams
        .filter((dream) => dream.title && dream.dreamDate && dream.content)
        .map((dream: DreamTypes) => {
          const { title, date, content, dreamDate, images, tags } = dream;

          return (
            <div className="rounded-md bg-darkPurple shadow-md">
              <Dialog.Root key={title}>
                <Dialog.Trigger asChild>
                  <button className=" w-full p-4 bg-violet4 text-violet11 rounded hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6">
                    <div className="flex items-center justify-between">
                      <span>{date ? date.toString() : "No date"}</span>
                      <LockKeyhole />
                    </div>
                    <span>{title ?? "Untitled"}</span>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-darkPurple fixed inset-0 bg-blackA6" />
                  <Dialog.Content className="fixed inset-0 w-full h-full bg-gray1 p-5 shadow-lg focus:outline-none">
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-center p-5 border-b border-gray-300">
                        <h2 className="text-xl font-semibold">
                          {title ?? "Title"}
                        </h2>
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
                        <div>
                          Dream day: {dreamDate?.toString() ?? "Unknown"}
                        </div>

                        {images?.length > 0 && (
                          <div className="mt-4">
                            {images.map((image) => (
                              <img
                                src={image}
                                key={image}
                                className="mt-2 rounded-md"
                              />
                            ))}
                          </div>
                        )}

                        {tags?.length > 0 && (
                          <div className="mt-4">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="mr-2 bg-gray-200 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div
                          dangerouslySetInnerHTML={{ __html: content }}
                          className="mt-4"
                        />
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          );
        })}
    </div>
  );
}
