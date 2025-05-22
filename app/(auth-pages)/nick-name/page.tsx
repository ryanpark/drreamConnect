import { saveNickName } from "@/app/actions";
import { Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function NickName(props: {
  searchParams: Promise<Message>;
}) {
  return (
    <>
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Choose your nick name</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="nick name">Your Nick Name</Label>
          <Input name="nickName" placeholder="stellaLee" />

          <SubmitButton
            pendingText="Signing In..."
            formAction={saveNickName}
            className="bg-yellow text-purple font-bold md:w-auto inline-flex mt-4"
          >
            Submit
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
