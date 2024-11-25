"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TipTap from "@/components/Tiptap";
import { saveDiary } from "@/app/actions";

export default function DiaryForm() {
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;

    await saveDiary({ title, content });
  };
  return (
    <form className="flex-1 flex flex-col min-w-64" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-medium">Write your dream</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="content">Dream</Label>
        <Input name="title" placeholder="Title" />

        <TipTap
          description={"Write your dream description"}
          onChange={setContent}
        />
        <textarea name="dream" placeholder="Write your dream" />

        <SubmitButton pendingText="Saving...">Submit</SubmitButton>
      </div>
    </form>
  );
}
