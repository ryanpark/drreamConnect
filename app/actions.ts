"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface saveDiaryTypes {
  title: string;
  content: string;
  imageUrls?: Array<string>;
  date: object | undefined;
  tags?: Array<string>;
}

interface UploadProps {
  file: File;
  bucket: string;
  folder?: string;
}

export const postComments = async (formData: FormData) => {
  const supabase = await createClient();
  const comments = formData.get("comments")?.toString();
  const id = formData.get("dreamId")?.toString();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data: existingData, error: fetchError } = await supabase
    .from("dreams")
    .select("comments")
    .eq("id", id)
    .single();

  if (fetchError || userError) {
    throw new Error(`Error fetching existing comments: ${fetchError.message}`);
  }

  const { data: person } = await supabase
    .from("profile")
    .select("nick_name")
    .eq("email", user?.email)
    .single();

  const { nick_name } = person as { nick_name: string };

  const newComment = { comment: comments, nickname: nick_name };
  const updatedComments = existingData?.comments
    ? [...existingData.comments, newComment]
    : [newComment];

  const { error: updateError } = await supabase
    .from("dreams")
    .update({ comments: updatedComments })
    .eq("id", id);

  if (updateError) {
    throw new Error(`Error updating comments: ${updateError.message}`);
  } else {
    return encodedRedirect("success", "/dreams", "Updated Nick Name !");
  }
};

export const updateProfile = async (formData: FormData) => {
  const nickName = formData.get("nickName")?.toString();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email || null;

  if (!email) {
    throw new Error("User is not authenticated. Cannot update profile.");
  }

  const { data, error } = await supabase
    .from("profile")
    .update({ nick_name: nickName || "nick name" })
    .eq("email", email)
    .select();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  } else {
    return encodedRedirect("success", "/profile", "Updated Nick Name !");
  }
};

export const uploadImage = async ({ file, bucket, folder }: UploadProps) => {
  const { storage } = await createClient();
  const fileExtension = file.name.split(".").pop();
  const filePath = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

  const { data, error } = await storage.from(bucket).upload(filePath, file);

  if (error) {
    return { imageUrl: null, error };
  }

  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
    data?.path
  }`;

  return { imageUrl, error: false };
};

export const saveDiary = async ({
  title,
  content,
  date,
  imageUrls,
  tags,
}: saveDiaryTypes) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data: person } = await supabase
    .from("profile")
    .select("nick_name")
    .eq("email", user?.email) // Assuming `user_id` is the foreign key in the `profile` table
    .single();

  const { nick_name } = person as { nick_name: string };

  const { data, error } = await supabase
    .from("dreams")
    .upsert([
      {
        content: content,
        nickname: nick_name,
        title: title,
        date: new Date(),
        dreamDate: date,
        images: imageUrls,
        tags: tags,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Failed to save dream: ${error.message}`);
  } else {
    // return encodedRedirect("success", "/diary", "save your dream");
    return { success: true, message: "Dream saved successfully!" };
  }
};

export const saveNickName = async (formData: FormData) => {
  const nickName = formData.get("nickName")?.toString();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email || null;

  const { data, error } = await supabase
    .from("profile")
    .upsert({ nick_name: nickName || "nick name", email: email })
    .select();

  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for choose Nick Name !"
    );
  }
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const signUpFacebookAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      // todo : replace local env with prod env
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export const signUpGoogleAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // todo : replace local env with prod env
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};
