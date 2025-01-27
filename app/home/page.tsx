import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="">
          <div className="flex">
            <div>
              <Image src="/hero.png" alt="hereos" width="832" height="448" />
            </div>
            <div>
              <Image
                src="/elephant.png"
                alt="hereos"
                width="299"
                height="299"
              />
            </div>
          </div>
          <div className="mt-9">
            <h2 className="text-3xl text-center">
              Dream, Share, Discover - Your Journey Begins Here{" "}
            </h2>
            <h2 className="text-3xl text-center">
              Unlock the Hidden World of Your Dreams
            </h2>
            <h1 className="text-center text-lg">
              DreamConnect is a new app designed for anyone who wants to
              explore, understand, and connect over dreams, all while
              prioritizing your privacy. It offers a unique mix of personal
              journaling, community sharing, and AI-driven insights in a secure
              and user-focused environment.
            </h1>
          </div>
          <div className="flex mb-20">
            <div>
              <Image src="/eyeball.png" alt="hereos" width="369" height="542" />
            </div>
            <div>
              <Image src="/women.png" alt="hereos" width="831" height="444" />
            </div>
          </div>
          <div className="flex flex-row mb-20">
            <div className="basis-2/3">
              <h3 className="text-xl">Your Personal Dream Diary Awaits</h3>
              <p>
                Capture every detail of your dreams with ease. Our app allows
                you to log emotions, add multimedia, and choose your privacy
                settings.
              </p>
              <Button className="bg-yellow text-purple font-bold">
                Log Your First Dream Today
              </Button>
            </div>
            <div className="basis-1/3">
              <img src="https://placehold.co/588x318" />
            </div>
          </div>
          <div className="flex flex-row mb-20">
            <div className="basis-2/3">
              <h3 className="text-xl">
                Connect with a vibrant community to share  and explore your
                dreams
              </h3>
              <p>
                Dream sharing is an enriching experience that allows you to
                connect with others.  Publish your dreams, engage in
                discussions, and uncover insights together.
              </p>
              <Button className="bg-yellow text-purple font-bold">
                Connect & Explore Dreams
              </Button>
            </div>
            <div className="basis-1/3">
              <img src="https://placehold.co/588x318" />
            </div>
          </div>
          <div className="flex flex-row mb-20">
            <div className="basis-2/3">
              <h3 className="text-xl">
                Unlock the Secrets of Your Dreams with  AI-Powered Insights and
                Analysis
              </h3>
              <p>
                Dive into the depths of your subconscious with our AI-driven
                dream analysis.  Gain valuable insights and understand the
                hidden meanings  behind your dreams.
              </p>
              <Button className="bg-yellow text-purple font-bold">
                Unlock My Dream Insights
              </Button>
            </div>
            <div className="basis-1/3">
              <img src="https://placehold.co/588x318" />
            </div>
          </div>
          <h2 className="text-3xl text-center mb-10">Explore Dreams</h2>
          <div className="flex flex-row justify-between">
            <div className="bg-yellow text-purple p-2 rounded mr-5">
              <div>avatar</div>
              <div>
                I found myself wandering through a dense, misty forest. The
                trees were towering, and the air was thick with fog. I could
                hear faint whispers, but no one was around. Suddenly, I saw a
                glowing path made of golden lea...
                <Badge className="border-none bg-purple text-gray-light">
                  #sky
                </Badge>
              </div>
            </div>
            <div className="bg-yellow text-purple p-2 rounded mr-5">
              <div>avatar</div>
              <div>
                I found myself wandering through a dense, misty forest. The
                trees were towering, and the air was thick with fog. I could
                hear faint whispers, but no one was around. Suddenly, I saw a
                glowing path made of golden lea...
              </div>
            </div>
            <div className="bg-yellow text-purple p-2 rounded ">
              <div>avatar</div>
              <div>
                I found myself wandering through a dense, misty forest. The
                trees were towering, and the air was thick with fog. I could
                hear faint whispers, but no one was around. Suddenly, I saw a
                glowing path made of golden lea...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
