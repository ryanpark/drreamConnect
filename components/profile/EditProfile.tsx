"use client";

import { SubmitButton } from "@/components/submit-button";
import { updateProfile } from "@/app/actions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface profileDataProps {
	nickname: string;
}

export default function EditProfile({ nickname }: profileDataProps) {
	const [isEditMode, setEditMode] = useState(false);
	const searchParams = useSearchParams();
	const success = searchParams.get("success");

	return (
		<div>
			<div>
				<button type="button" onClick={() => setEditMode(true)}>
					edit my nick name
				</button>
			</div>
			{success && success}
			{isEditMode && !success ? (
				<form className="flex-1 flex flex-col min-w-64">
					<div>
						<input type="text" defaultValue={nickname} name="nickName" />
						<SubmitButton pendingText="Saving..." formAction={updateProfile}>
							Submit
						</SubmitButton>
					</div>
				</form>
			) : (
				<p>{nickname}</p>
			)}
		</div>
	);
}
