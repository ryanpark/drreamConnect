import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import EditProfile from "@/components/profile/EditProfile";
import Avatar from "@/components/avatar/Avatar";
import Link from "next/link";

interface UserMetadataProps {
  email: string;
  name: string;
}

export default async function Profile({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  
  if (!user || !user.user_metadata) {
    return <div>No user metadata available.</div>;
  }

  const { email, name } = user.user_metadata as UserMetadataProps;

  const { data, error } = await supabase
    .from("profile")
    .select("nick_name, avatar")
    .eq("email", user?.email)
    .single();
    

  if (!data || error) {
     redirect('/nick-name');
  }

  const { nick_name, avatar } = data as { nick_name: string; avatar: string };

  // Await searchParams to get the actual query parameters
  const resolvedSearchParams = await searchParams;
  const editMode = resolvedSearchParams.edit === "true";

  return (
    <div className="p-5 rounded-md bg-darkPurple shadow-md relative">
      <div className="w-full">
        <div className="flex">
          <div className="text-center">
            <Avatar avatar={avatar} isEditMode={editMode} />
            <EditProfile nickname={nick_name} isEditMode={editMode} />
          </div>
          {!editMode && (
            <div className="ml-5">
              <p>{name}</p>
              <p>{email}</p>
            </div>
          )}
        </div>
        {/* Toggle edit mode via a Link component */}
        <div className="text-right mt-5">
          <Link href={`?edit=${!editMode}`} className="underline">
            {editMode ? "Cancel" : "Edit Profile"}
          </Link>
        </div>
      </div>
    </div>
  );
}
