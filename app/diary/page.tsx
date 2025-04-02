import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import DiaryForm from "@/components/diary/DiaryForm";
import Image from "next/image";

export default async function Diary() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: dreams, error } = await supabase
		.from("dreams")
		.select("*")
		.eq("email", user?.email)
		.order("created_at", { ascending: false });

	if (!user) {
		return redirect("/sign-in");
	}

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<div className="w-full">
				<div className="flex justify-center mb-[-91]">
					<Image src="/sun.png" alt="girl" width={336} height={301} />
				</div>

				<div className="min-h-screen bg-light-purple text-white p-6 rounded-lg shadow-lg relative z-9">
					{/* <h1>Dream Diary</h1> */}
					<DiaryForm />
				</div>
				<div className="flex justify-center mb-[0]">
					<Image src="/heels.png" alt="girl" width={278} height={278} />
				</div>
			</div>
		</div>
	);
}
