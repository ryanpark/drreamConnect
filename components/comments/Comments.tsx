"use client";

import { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/avatar/Avatar";
import { SubmitButton } from "@/components/submit-button";
import { postComments } from "@/app/actions";

interface CommentProps {
	id: number;
	comments: CommentType[];
	user: object | null;
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
				className="flex cursor-pointer mt-5"
				onClick={() => setShowComments(!isShowComments)}
			>
				<MessageSquareMore className="mr-1 cursor-pointer" /> {comments?.length}
			</div>
			{isShowComments &&
				comments?.map((comment: CommentType) => {
					return (
						<div key={comment.comment} className="flex items-center mt-5 mb-5">
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
						className="bg-purple h-20 border-purple text-white focus-visible:ring-0 focus-visible:ring-offset-0"
						placeholder="Add commnent"
						name="comments"
					/>
					<input type="hidden" name="dreamId" value={id} />
					<div className="mt-5">
						<SubmitButton
							formAction={postComments}
							className="bg-yellow text-purple w-full md:w-auto mr-5"
						>
							Make comment
						</SubmitButton>
						<button onClick={() => setShowComments(false)}>cancel</button>
					</div>
				</form>
			)}
		</>
	);
}
