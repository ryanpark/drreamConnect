"use client";

import { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/avatar/Avatar";
import { SubmitButton } from "@/components/submit-button";
import { postComments } from "@/app/actions";

interface User {
	id: string;
	email: string;
	full_name: string;
}

interface CommentProps {
	id: number;
	comments: CommentType[];
	user: Pick<User, "id" | "email" | "full_name">;
}

interface CommentType {
	comment: string;
	nickname: string;
	avatar: string;
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
						<div key={comment.nickname} className="flex">
							{comment.nickname && (
								<Avatar
									avatar={comment.avatar}
									visible
									nickname={comment.nickname}
									size={40}
								/>
							)}
							{comment.comment}
						</div>
					);
				})}
			{user && isShowComments && (
				<form>
					{/* <Input type="textarea" name="comments" /> */}
					<Input
						className="bg-purple border-purple text-white focus-visible:ring-0 focus-visible:ring-offset-0"
						placeholder="make commnent"
						name="comments"
					/>
					<input type="hidden" name="dreamId" value={id} />

					<SubmitButton formAction={postComments}>Make comment</SubmitButton>
					<button onClick={() => setShowComments(false)}>cancel</button>
				</form>
			)}
		</>
	);
}
