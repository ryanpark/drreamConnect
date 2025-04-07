"use client";

import { useState, type MouseEvent } from "react";
import { analyseDream, addAnalyseDream } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface DreamAnalysisProps {
	content: string;
	id: number;
}

interface DreamAnalysis {
	analysis?: string | null;
	error?: string;
}

export default function DreamAnalysis({ content, id }: DreamAnalysisProps) {
	console.log("handleAnalyseDream called");
	const [analysis, setAnalysis] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleAnalyseDream = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setAnalysis(null);

		try {
			const result: DreamAnalysis = await analyseDream(content);

			if (result?.analysis) {
				setAnalysis(result.analysis);
				await addAnalyseDream({
					dream: { analysis: result.analysis },
					id: id,
				});
			} else if (result.error) {
				setError(result.error);
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
				onClick={(e: MouseEvent<HTMLButtonElement>) => handleAnalyseDream(e)}
				disabled={loading}
				className="bg-yellow text-purple"
			>
				{loading ? (
					<div className="flex">
						<Spinner size="md" className="bg-purple mr-4" />
						Analysing...
					</div>
				) : (
					"🔮 Unlock My Dream's Meaning"
				)}
			</Button>

			{analysis && (
				<div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
					<h3 className="font-semibold">Dream Analysis:</h3>
					<p>{analysis}</p>
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
