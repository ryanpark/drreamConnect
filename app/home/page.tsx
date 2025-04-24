import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
	return (
		<div className="flex-1 w-full flex flex-col gap-8 md:gap-12">
			<div className="w-full">
				<div className="">
					{/* Hero Section */}
					<div className="flex flex-col items-center justify-center md:relative mt-8 md:mt-0">
						<div>
							<Image
							src="/hero.png"
							alt="heroes"
							width={774}
							height={417}
							className="w-full max-w-[774px] h-auto"
							/>
						</div>
						<div className="text-center">
							<h2 className="text-2xl md:text-4xl mb-2 pt-14 md:mb-2 font-satoshi">
							Dream, Share, and Discover.
							</h2>
							<h2 className="text-2xl md:text-4xl mb-6 md:mb-7 text-yellow font-satoshi">
							Your Journey Begins Here.
							</h2>
							<h2 className="mt-1 text-xl md:text-lg text-gray-light font-satoshi">
							Unlock the Hidden World of Your Dreams
							</h2>
						</div>
						<div className="md:absolute md:left-[-72px] md:top-[359px] content-center">
							<Image
								src="/ele.png"
								alt="heroes"
								width={287}
								height={273}
								//	className="w-[100px] md:w-[287px] h-auto"
							/>
						</div>
					</div>
					{/* Intro Text */}
					<div className="flex flex-col items-center justify-center mt-14">
						<div className="relative flex justify-center order-2 md:order-1">
							<div>
							<Image
								src="/eye.png"
								alt="heroes"
								width={136}
								height={233}
								// className="w-[70px] md:w-[136px] h-auto"
							/>
							</div>
						</div>
						<h1 className="text-center text-lg md:text-xl max-w-md md:max-w-2xl order-1 md:order-2 mb-6 md:mb-0 md:mt-6">
							DreamConnect combines personal journaling, community sharing, and AI-powered insights to help you explore your
							dreams like never before.
						</h1>
					</div>
					

					{/* Features Header */}
					<h2 className="text-2xl md:text-4xl font-light mb-16 md:mb-40 mt-16 md:mt-40 text-center">
						Discover Our Features
					</h2>

					{/* Feature Sections */}
					<div className="flex flex-col md:flex-row mb-12 md:mb-20 gap-6 px-4">
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<h3 className="text-xl md:text-2xl mb-2 font-bold">
								🌟 Dream Diary
							</h3>
							<p className="my-3 text-gray-light font-semibold text-sm md:text-base">
								Capture every detail of your dreams in a personalized journal.
							</p>
							<ul className="list-disc pl-5 marker:text-yellow mb-6 md:mb-10 text-sm md:text-base">
								<li className="py-1">
									Log dreams with date, time, and emotional impact
								</li>
								<li className="py-1">
									Add voice recordings, videos, or sketches
								</li>
								<li className="py-1">Choose privacy settings for each entry</li>
							</ul>
							<Link href="/home/diary">
								<Button className="bg-yellow text-purple font-bold w-full md:w-auto">
									Log Your First Dream Today
								</Button>
							</Link>
						</div>
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<img
								src="https://placehold.co/588x318"
								alt="Dream Diary Preview"
								className="w-full h-auto"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row mb-12 md:mb-20 gap-6 px-4">
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<h3 className="text-xl md:text-2xl mb-2 font-bold">
								🦄 Dream Sharing
							</h3>
							<p className="my-3 text-gray-light font-semibold text-sm md:text-base">
								Connect with others through your dream experiences.
							</p>
							<ul className="list-disc pl-5 marker:text-yellow mb-6 md:mb-10 text-sm md:text-base">
								<li className="py-1">Share dreams with the community</li>
								<li className="py-1">Add keyword tags for discoverability</li>
								<li className="py-1">Comment and discuss with others</li>
							</ul>
							<Link href="/home/diary">
								<Button className="bg-yellow text-purple font-bold w-full md:w-auto">
									Log Your First Dream Today
								</Button>
							</Link>
						</div>
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<img
								src="https://placehold.co/588x318"
								alt="Dream Sharing Preview"
								className="w-full h-auto"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row mb-12 md:mb-20 gap-6 px-4">
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<h3 className="text-xl md:text-2xl mb-2 font-bold">
								👁️ Find Related Dreams
							</h3>
							<p className="my-3 text-gray-light font-semibold text-sm md:text-base">
								Discover dreams with similar themes and symbols.
							</p>
							<ul className="list-disc pl-5 marker:text-yellow mb-6 md:mb-10 text-sm md:text-base">
								<li className="py-1">Search by tags or themes</li>
								<li className="py-1">Find shared dream experiences</li>
								<li className="py-1">Connect over recurring symbols</li>
							</ul>
							<Link href="/home/diary">
								<Button className="bg-yellow text-purple font-bold w-full md:w-auto">
									Log Your First Dream Today
								</Button>
							</Link>
						</div>
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<img
								src="https://placehold.co/588x318"
								alt="Find Related Dreams Preview"
								className="w-full h-auto"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row mb-12 md:mb-20 gap-6 px-4">
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<h3 className="text-xl md:text-2xl mb-2 font-bold">
								🔮 AI Dream Analysis
							</h3>
							<p className="my-3 text-gray-light font-semibold text-sm md:text-base">
								Gain insights into your dreams with advanced AI interpretation.
							</p>
							<ul className="list-disc pl-5 marker:text-yellow mb-6 md:mb-10 text-sm md:text-base">
								<li className="py-1">Get AI-powered symbol interpretations</li>
								<li className="py-1">Ask ChatGPT specific questions</li>
								<li className="py-1">Track emotional patterns</li>
							</ul>
							<Link href="/home/diary">
								<Button className="bg-yellow text-purple font-bold w-full md:w-auto">
									Log Your First Dream Today
								</Button>
							</Link>
						</div>
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<img
								src="https://placehold.co/588x318"
								alt="AI Dream Analysis Preview"
								className="w-full h-auto"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row mb-12 md:mb-20 gap-6 px-4">
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<h3 className="text-xl md:text-2xl mb-2 font-bold">
								🖼️ AI Dream Image Generator
							</h3>
							<p className="my-3 text-gray-light font-semibold text-sm md:text-base">
								Transform your dreams into stunning visual art.
							</p>
							<ul className="list-disc pl-5 marker:text-yellow mb-6 md:mb-10 text-sm md:text-base">
								<li className="py-1">Generate surreal dreamscapes</li>
								<li className="py-1">Customize with AI tools</li>
								<li className="py-1">Share your creations</li>
							</ul>
							<Link href="/home/diary">
								<Button className="bg-yellow text-purple font-bold w-full md:w-auto">
									Log Your First Dream Today
								</Button>
							</Link>
						</div>
						<div className="w-full md:w-1/2 p-0 md:p-4">
							<img
								src="https://placehold.co/588x318"
								alt="AI Dream Image Generator Preview"
								className="w-full h-auto"
							/>
						</div>
					</div>

					{/* Explore Dreams Section */}
					<div className="my-16 md:my-40 px-4">
						<h2 className="text-2xl md:text-3xl text-center mb-8 md:mb-10">
							Explore Dreams
						</h2>
						<div className="flex flex-col md:flex-row justify-between gap-4 md:gap-4">
							<div className="bg-yellow text-purple p-4 md:p-5 rounded">
								<div className="mb-2">avatar 1</div>
								<div className="text-sm md:text-base">
									I found myself wandering through a dense, misty forest. The
									trees were towering, and the air was thick with fog...
								</div>
								<div className="my-2 flex flex-wrap gap-2">
									<Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
										#sky
									</Badge>
									<Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
										#scary
									</Badge>
								</div>
							</div>
							<div className="bg-yellow text-purple p-4 md:p-5 rounded">
								<div className="mb-2">avatar 2</div>
								<div className="text-sm md:text-base">
									I found myself wandering through a dense, misty forest. The
									trees were towering, and the air was thick with fog...
								</div>
								<div className="my-2 flex flex-wrap gap-2">
									<Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
										#sky
									</Badge>
									<Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
										#scary
									</Badge>
								</div>
							</div>
							<div className="bg-yellow text-purple p-4 md:p-5 rounded">
								<div className="mb-2">avatar 3</div>
								<div className="text-sm md:text-base">
									I found myself wandering through a dense, misty forest. The
									trees were towering, and the air was thick with fog...
								</div>
								<div className="my-2 flex flex-wrap gap-2">
									<Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
										#sky
									</Badge>
									<Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
										#sea
									</Badge>
									<Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
										#girls
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
