"use client";

import { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { postComments } from "@/app/actions";

interface CommentProps {
  id: number;
}

export function Comments({ id }: CommentProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {!isEdit ? (
        <MessageSquareMore
          onClick={() => setIsEdit(true)}
          className="cursor-pointer"
        />
      ) : (
        <form>
          <Input type="textarea" name="comments" />
          <input type="hidden" name="dreamId" value={id} />

          <SubmitButton formAction={postComments}>Make comment</SubmitButton>
          <button onClick={() => setIsEdit(false)}>cancel</button>
        </form>
      )}
    </>
  );
}
