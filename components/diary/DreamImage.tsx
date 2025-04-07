"use client";

import { useState, type MouseEvent } from "react";
import { generateAIimage, addAIimage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

interface DreamImageProps {
	content: string;
	id: number;
}

export default function DreamImage({ content, id }: DreamImageProps) {
	const [image, setImage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const startGenerateAIimage = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setImage(null);

		try {
			const imageUrl = await generateAIimage(content);
			setImage(imageUrl);
			if (imageUrl) {
				await addAIimage({
					image: imageUrl,
					id: id,
				});
			}
		} catch (err) {
			setError("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-4">
			<Button
				type="submit"
				onClick={startGenerateAIimage}
				disabled={loading}
				className="bg-yellow text-purple"
			>
				{loading ? (
					<div className="flex">
						<Spinner size="md" className="bg-purple mr-4" />
						generating...
					</div>
				) : (
					"🖼️ Generate AI image"
				)}
			</Button>

			{image && (
				<div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
					<h3 className="font-semibold">Your generated AI image:</h3>
					<Image
						src={image}
						width={512}
						height={512}
						alt=""
						className="mt-2 max-w-full"
					/>
				</div>
			)}
			{error && (
				<div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
					<p>{error}</p>
				</div>
			)}
		</div>
	);
}
