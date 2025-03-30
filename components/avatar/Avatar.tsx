"use client";
import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { updateAvatar } from "@/app/actions";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";

interface AvatarProps {
	avatar: string | undefined;
	visible?: boolean;
}

const seeds = [
	"John",
	"Jane",
	"Alex",
	"Emma",
	"Chris",
	"Lily",
	"Max",
	"Sophie",
	"Ryan",
	"Jessica",
	"Sally",
];

const generateAvatar = (seed: string) => {
	const avatar = createAvatar(personas, {
		seed,
		// Optional customization
		size: 128,
		backgroundColor: ["transparent"],
	});
	return avatar.toString(); // Returns SVG string
};

export default function Avatar({ avatar, visible = false }: AvatarProps) {
	const [defaultAvatar, setAvatar] = useState(avatar ?? "");
	const [isEdit, setEdit] = useState(false);

	console.log(defaultAvatar);
	return (
		<div className="flex flex-wrap justify-center gap-4 p-4">
			{!visible && (
				<div>
					<button type="button" onClick={() => setEdit(!isEdit)}>
						Edit Avatar
					</button>
				</div>
			)}
			<div>
				<form className="flex-1 flex flex-col min-w-64">
					<div>
						<div
							dangerouslySetInnerHTML={{
								__html: generateAvatar(defaultAvatar),
							}}
							className="w-32 h-32 rounded-full"
						/>

						{isEdit && (
							<>
								<input
									type="text"
									value={defaultAvatar}
									name="seed"
									className="hidden"
								/>
								<SubmitButton pendingText="Saving..." formAction={updateAvatar}>
									Submit
								</SubmitButton>
							</>
						)}
					</div>
				</form>
			</div>
			{isEdit &&
				seeds.map((seed, index) => (
					<div key={index} className="flex flex-col items-center">
						<div
							onClick={() => setAvatar(seed)}
							dangerouslySetInnerHTML={{ __html: generateAvatar(seed) }}
							className="w-32 h-32 rounded-full"
						/>
						<p className="mt-2 text-sm">{seed}</p>
					</div>
				))}
		</div>
	);
}
