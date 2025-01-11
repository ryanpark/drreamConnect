import { createClient } from "@/utils/supabase/server";
import EditProfile from "@/components/profile/EditProfile";

interface UserMetadataProps {
  email: string;
  name: string;
}

export default async function Profile({ isEditMode }: { isEditMode: boolean }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.user_metadata) {
    return <div>No user metadata available.</div>;
  }

  const { email, name } = user.user_metadata as UserMetadataProps;

  const { data: person } = await supabase
    .from("profile")
    .select("nick_name")
    .eq("email", user?.email)
    .single();

  const { nick_name } = person as { nick_name: string };

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>Profile</h1>
          <p>Name:{name}</p>
          <p>Email: {email}</p>
        </div>
        <EditProfile nickname={nick_name} />
      </div>
    </div>
  );
}
