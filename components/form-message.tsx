import Image from "next/image";
import { InfoIcon } from "lucide-react";
export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md items-center">
      {Object.keys(message).length > 0 && (
        <>
          <Image
            src="/rabbit.png"
            width={174}
            height={248}
            alt="Picture of the author"
          />
        </>
      )}

      {"success" in message && (
        <div className="text-foreground flex bg-secondary-purple p-5 rounded-md mb-10">
          {" "}
          <InfoIcon size={16} className="mt-0.5 mr-3" />
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground">{message.message}</div>
      )}
    </div>
  );
}
