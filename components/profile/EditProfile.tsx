"use client";

import { SubmitButton } from "@/components/submit-button";
import { updateProfile } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
interface profileDataProps {
  nickname: string;
  isEditMode: boolean;
}

export default function EditProfile({
  nickname = "",
  isEditMode = false,
}: profileDataProps) {
  //const [isEditMode, setEditMode] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div>
      <div>
        {/* <button type="button" onClick={() => setEditMode(true)}>
					edit my nick name
				</button> */}
      </div>
      {success && success}
      {isEditMode && !success ? (
        <>
          <h2 className="mb-10 mt-10">Choose your Nick name</h2>
          <form className="justify-center items-center flex">
            <div className="flex w-[400px]">
              <Input
                type="text"
                defaultValue={nickname}
                name="nickName"
                className="bg-purple border-purple placeholder-yellow text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <SubmitButton
                pendingText="Saving..."
                formAction={updateProfile}
                className="ml-5"
              >
                Save Nick Name
              </SubmitButton>
            </div>
          </form>
        </>
      ) : (
        <p>{nickname}</p>
      )}
    </div>
  );
}
