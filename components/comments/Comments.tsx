"use client";

import { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { postComments } from "@/app/actions";

interface CommentProps {
	id: number;
	comments: CommentType[];
	user: any; //to do
}

interface CommentType {
	comment: string;
	nickname: string;
}

export function Comments({ id, comments, user }: CommentProps) {
	const [isShowComments, setShowComments] = useState(false);

	return (
		<>
			<div
				className="flex cursor-pointer"
				onClick={() => setShowComments(!isShowComments)}
			>
				<MessageSquareMore className="mr-1 cursor-pointer" /> {comments?.length}
			</div>
			{isShowComments &&
				comments?.map((comment: CommentType) => {
					return (
						<div>
							{comment.nickname} , {comment.comment}
						</div>
					);
				})}
			{user && isShowComments && (
				<form>
					<Input type="textarea" name="comments" />
					<input type="hidden" name="dreamId" value={id} />

					<SubmitButton formAction={postComments}>Make comment</SubmitButton>
					<button onClick={() => setShowComments(false)}>cancel</button>
				</form>
			)}
		</>
	);
}
