"use client";
import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { updateAvatar } from "@/app/actions";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";

interface AvatarProps {
	avatar: string | undefined;
	nickname?: string | undefined;
	visible?: boolean;
	size?: number;
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

const generateAvatar = (seed: string, size: number) => {
	const avatar = createAvatar(personas, {
		seed,
		// Optional customization
		size: size,
		radius: 50,
		backgroundColor: ["transparent"],
	});
	return avatar.toString(); // Returns SVG string
};

export default function Avatar({
	avatar,
	visible = false,
	nickname,
	size = 100,
}: AvatarProps) {
	const [defaultAvatar, setAvatar] = useState(avatar ?? "");
	const [isEdit, setEdit] = useState(false);

	if (visible) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div
							dangerouslySetInnerHTML={{
								__html: generateAvatar(defaultAvatar, size),
							}}
							className=""
						/>
					</TooltipTrigger>
					<TooltipContent>{nickname ?? "Emma"}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return (
		<div className="flex flex-wrap justify-center gap-4 p-4">
			<div>
				<button type="button" onClick={() => setEdit(!isEdit)}>
					Edit Avatar
				</button>
			</div>

			<div>
				<form className="flex-1 flex flex-col min-w-64">
					<div>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div
										dangerouslySetInnerHTML={{
											__html: generateAvatar(defaultAvatar, size),
										}}
										className="w-32 h-32 rounded-full"
									/>
								</TooltipTrigger>
								<TooltipContent>{nickname ?? "Emma"}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
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
							dangerouslySetInnerHTML={{ __html: generateAvatar(seed, size) }}
							className="w-32 h-32 rounded-full"
						/>
						<p className="mt-2 text-sm">{seed}</p>
					</div>
				))}
		</div>
	);
}
