import { createClient } from "@/utils/supabase/server";
import EditProfile from "@/components/profile/EditProfile";
import Avatar from '@/components/avatar/Avatar';

interface UserMetadataProps {
  email: string;
  name: string;
}

export default async function Profile() {
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

  const { nick_name, avatar } = data as { nick_name: string; avatar: string };

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <h1>Profile</h1>
          <p>Name:{name}</p>
          <p>Email: {email}</p>
        </div>
        <EditProfile nickname={nick_name} />
        <Avatar avatar={avatar}/>
      </div>
    </div>
  );
}
