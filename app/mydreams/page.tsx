import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DreamLists from "@/components/diary/DreamLists";

export default async function Mydreams() {
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
				<div className="">
					<div className="flex flex-col items-center justify-center mb-10">
						<div>
							<h1 className="text-2xl">My Journal Dreams</h1>
						</div>
						<div className="mt-10">
							<Button className="bg-yellow text-purple font-bold w-full md:w-auto">
								<Link href={"/diary"}> Log your dream </Link>
							</Button>
						</div>
					</div>
					<DreamLists dreams={dreams ?? []} />
					<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
						<Label htmlFor="content">dream</Label>
					</div>
				</div>
			</div>
		</div>
	);
}
