import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Comments } from "@/components/comments/Comments";
import * as Dialog from "@radix-ui/react-dialog";
import { CircleX } from "lucide-react";
import Avatar from "@/components/avatar/Avatar";

interface DreamType {
	title: string;
	content: string;
	date: string;
	tags?: string[];
	images?: string;
	nickname: string;
	id: number;
	comments: CommentType[];
	avatar?: string;
}

interface CommentType {
	comment: string;
	nickname: string;
}

export default async function Diary() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: dreams, error } = await supabase
		.from("dreams")
		.select("*")
		.eq("public", true)
		.order("created_at", { ascending: false });

	console.log(dreams);
	const uniqueDreams = Object.values(
		(dreams || []).reduce((acc, dream) => {
			if (!acc[dream.email]) {
				acc[dream.email] = dream;
			}
			return acc;
		}, {}),
	);
	const shuffledDreams = (uniqueDreams as DreamType[])?.sort(
		() => Math.random() - 0.5,
	);

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<div className="w-full">
				<h1 className="text-2xl text-center m-10">Explore Dreams</h1>

				<div className="flex gap-6">
					{shuffledDreams.map((dreams: DreamType) => {
						const {
							title,
							content,
							date,
							tags,
							images,
							nickname,
							id,
							comments,
							avatar,
						} = dreams;
						console.log(avatar);
						return (
							<div className="p-4 rounded-md bg-darkPurple shadow-md">
								<Dialog.Root>
									<Dialog.Trigger asChild>
										<button className=" w-full p-4 bg-violet4 text-violet11 rounded hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 text-left">
											<div className="">
												<p>user: {nickname}</p>
												<p>{date}</p>
												<p>title : {title}</p>
												<Avatar avatar={avatar} visible />
												<p>{avatar}</p>
												<p>
													content :
													<div dangerouslySetInnerHTML={{ __html: content }} />
												</p>
												<div className="pt-2">
													{tags?.map((tag, index) => (
														<Badge key={index} className="mr-2">
															{tag}
														</Badge>
													))}
												</div>
											</div>
										</button>
									</Dialog.Trigger>
									<Dialog.Portal>
										<Dialog.Overlay className="bg-darkPurple fixed inset-0 bg-blackA6" />
										<Dialog.Content className="fixed inset-0 w-full h-full bg-gray1 p-5 shadow-lg focus:outline-none">
											<div className="h-full flex flex-col">
												{/* Header */}
												<div className="flex justify-between items-center p-5 border-b border-gray-300">
													<h2 className="text-xl font-semibold">{title}</h2>
													<Dialog.Close asChild>
														<button
															className="size-[30px] rounded-full bg-gray3 text-violet11 hover:bg-violet4 focus:outline-none focus:ring-2 focus:ring-violet7"
															aria-label="Close"
														>
															<CircleX />
														</button>
													</Dialog.Close>
												</div>

												{/* Content */}
												<div className="flex-1 overflow-auto p-5">
													<p>user: {nickname}</p>
													<p>{date}</p>
													<p>title : {title}</p>
													<p>
														content :
														<div
															dangerouslySetInnerHTML={{ __html: content }}
														/>
													</p>
													<div className="pt-2">
														{tags?.map((tag, index) => (
															<Badge key={index} className="mr-2">
																{tag}
															</Badge>
														))}
													</div>
													{images && (
														<p>
															<img src={images} alt={images} />
														</p>
													)}
												</div>
											</div>
										</Dialog.Content>
									</Dialog.Portal>
								</Dialog.Root>

								{<Comments id={id} comments={comments} user={user} />}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
