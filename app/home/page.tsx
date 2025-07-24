import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "DreamConnect | Dream, Share, and Discover Your Dreams",
  description:
    "DreamConnect is your platform to journal, share, and analyze dreams with AI-powered insights. Join a community passionate about dream exploration and self-discovery.",
  openGraph: {
    title: "DreamConnect | Dream, Share, and Discover Your Dreams",
    description:
      "DreamConnect is your platform to journal, share, and analyze dreams with AI-powered insights. Join a community passionate about dream exploration and self-discovery.",
    url: "https://dreamconnect.com/", // Update to your real URL
    siteName: "DreamConnect",
    images: [
      {
        url: "https://t1.daumcdn.net/top/favicon/20241223/daum_og.png", // Place a relevant image in public/
        width: 1200,
        height: 630,
        alt: "DreamConnect Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamConnect | Dream, Share, and Discover Your Dreams",
    description:
      "DreamConnect is your platform to journal, share, and analyze dreams with AI-powered insights. Join a community passionate about dream exploration and self-discovery.",
    images: [
      "/hero.png" // Place a relevant image in public/
    ],
    creator: "@dreamconnect", // Update to your Twitter handle
  },
};

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 md:gap-12">
      <div className="w-full">
        <div className="">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center md:relative mt-8 md:mt-0">
            <div className="mb-12">
              <Image
                src="/dot.svg"
                width={44}
                height={44}
                alt="Picture of the author"
              />
            </div>
            <div>
              <Image
                src="/hero.png"
                alt="heroes"
                width={774}
                height={417}
                className="w-full max-w-[774px] h-auto"
                priority
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
            <div className="md:absolute md:left-[-72px] md:top-[359px] content-center mt-10">
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
          <div className="flex flex-col items-center justify-center mt-14 p-5">
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
              DreamConnect combines personal journaling, community sharing, and
              AI-powered insights to help you explore your dreams like never
              before.
            </h1>
          </div>
          <div className="mb-12 mt-12 text-center flex justify-center">
            <Image
              src="/dot.svg"
              width={44}
              height={44}
              alt="Picture of the author"
            />
          </div>

          <div className="text-center mt-5 text-lg">
            <ul>
              <li className="mb-4"> 🌟 Dream Diary</li>
              <li className="mb-4"> 🦄 Dream Sharing</li>
              {/* <li className="mb-4"> 👁️ Find Related Dreams</li> */}
              <li className="mb-4"> 🔮 AI Dream Analysis</li>
              <li className="mb-4"> 🖼️ AI Dream Image Generator</li>
            </ul>
          </div>
          <div className="flex items-center justify-center mt-20">
            <Link href="/dreams">
              <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                Explore Dreams
              </Button>
            </Link>
          </div>
          {/* Features Header */}
          <h2 className="text-2xl md:text-4xl font-light mb-16 md:mb-40 mt-16 md:mt-40 text-center font-satoshi underline decoration-wavy decoration-yellow">
            Discover Our Features
          </h2>

          {/* Feature Sections */}
          <div className="flex flex-col md:flex-row md:mb-20 gap-6 px-5 mb-10">
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <h3 className="text-xl md:text-3xl mb-2 font-satoshi">
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
              {/* Button visible only on desktop */}
              <div className="flex items-center justify-center mb-10 md:block hidden">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    Log Your First Dream Today
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <div className="relative w-full aspect-video border rounded-md border-purple shadow-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="auto"
                  className="w-full h-full rounded-md object-cover"
                >
                  <source src="/feature001.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Button visible only on mobile */}
              <div className="flex items-center justify-center mb-10 block md:hidden">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto mt-10">
                    Log Your First Dream Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-28 md:mb-20 gap-6 px-5">
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <h3 className="text-xl md:text-3xl mb-2 font-satoshi">
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
              {/* Button visible only on desktop */}
              <div className="hidden md:block">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    Share Your Dream
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <div className="relative w-full aspect-video border rounded-md border-purple shadow-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="auto"
                  className="w-full h-full rounded-md object-cover"
                >
                  <source src="/feature02.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Button visible only on mobile */}
              <div className="flex items-center justify-center mb-10 block md:hidden mt-10">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    Share Your Dream
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col md:flex-row mb-28 md:mb-20 gap-6 px-5">
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <h3 className="text-xl md:text-2xl mb-2 font-satoshi">
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
              {/* Button visible only on desktop */}
              {/* <div className="hidden md:block">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    See Connected Dreams
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <img
                src="https://placehold.co/588x318"
                alt="Find Related Dreams Preview"
                className="w-full h-auto"
              />
            
              <div className="flex items-center justify-center mb-10 block md:hidden mt-10">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    See Connected Dreams
                  </Button>
                </Link>
              </div>
            </div>
          </div> */} 

          <div className="flex flex-col md:flex-row mb-28 md:mb-20 gap-6 px-5">
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <h3 className="text-xl md:text-2xl mb-2 font-satoshi">
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
              {/* Button visible only on desktop */}
              <div className="hidden md:block">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    Analyze My Dream with AI
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <div className="relative w-full aspect-video border rounded-md border-purple shadow-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="auto"
                  className="w-full h-full rounded-md object-cover"
                >
                  <source src="/feature004.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Button visible only on mobile */}
              <div className="flex items-center justify-center mb-10 block md:hidden mt-10">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    Analyze My Dream with AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-28 md:mb-20 gap-6 px-5">
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <h3 className="text-xl md:text-2xl mb-2 font-satoshi">
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
              {/* Button visible only on desktop */}
              <div className="hidden md:block">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    Create Dreamscape with AI
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-0 md:p-4">
              <div className="relative w-full aspect-video border rounded-md border-purple shadow-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="auto"
                  className="w-full h-full rounded-md object-cover"
                >
                  <source src="/feat5.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Button visible only on mobile */}
              <div className="flex items-center justify-center mb-10 block md:hidden mt-10">
                <Link href="/diary">
                  <Button className="bg-yellow text-purple font-bold w-full md:w-auto">
                    Analyze My Dream with AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Explore Dreams Section */}
          <div className="my-16 md:my-40 px-4">
            <h2 className="text-2xl md:text-3xl text-center mb-8 md:mb-10">
              Explore Dreams
            </h2>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-4">
              <div className="bg-yellow text-purple p-4 md:p-5 rounded">
                <Link href="/dreams" className="hover:no-underline">
                  <div className="mb-2 font-bold">
                    The Whispering Forest of Faces
                  </div>
                  <div className="text-sm md:text-base">
                    Last night, I dreamed I was walking through a forest where
                    every tree had a human face carved into its bark. The faces
                    whispered my name in unison, their voices like wind
                    chimes...
                  </div>
                </Link>
                <div className="my-2 flex flex-wrap gap-2">
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #Surreal
                  </Badge>
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #TalkingTrees
                  </Badge>
                </div>
              </div>
              <div className="bg-yellow text-purple p-4 md:p-5 rounded">
                <Link href="/dreams" className="hover:no-underline">
                  <div className="mb-2 font-bold">The Melting Clock Tower</div>
                  <div className="text-sm md:text-base">
                    I had the strangest dream about a city where a giant clock
                    tower stood in the center, but its face was melting like
                    wax, dripping numbers onto the cobblestone...
                  </div>
                </Link>
                <div className="my-2 flex flex-wrap gap-2">
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #Time
                  </Badge>
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #Melting
                  </Badge>
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #Memories
                  </Badge>
                </div>
              </div>
              <div className="bg-yellow text-purple p-4 md:p-5 rounded">
                <Link href="/dreams" className="hover:no-underline">
                  <div className="mb-2 font-bold">
                    The Train of Forgotten Toys
                  </div>
                  <div className="text-sm md:text-base">
                    In my dream, I was on a train that stretched forever, its
                    cars filled with old toys—teddy bears with missing eyes,
                    dolls that giggled,...
                  </div>
                </Link>
                <div className="my-2 flex flex-wrap gap-2">
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #Nostalgia
                  </Badge>
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #Toys
                  </Badge>
                  <Badge className="border-none bg-purple text-gray-light text-xs md:text-sm">
                    #Desert
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
