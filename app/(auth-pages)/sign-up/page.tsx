import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("success" in searchParams) {
    return (
      <>
        <div className="w-full items-center sm:max-w-md gap-2 p-4 text-center">
          <FormMessage message={searchParams} />
          Now Let's{" "}
          <Link href="/dreams" className="underline text-yellow">
            Explore Dreams
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-satoshi mb-10 pl-10 pr-10">
        Explore, understand, and connect over dreams
      </h1>

      <div className="p-10 rounded-md bg-darkPurple shadow-md relative">
        <div className="absolute right-[-107px] top-[-200px] hidden sm:block">
          <Image
            src="/bitch.png"
            width={175}
            height={349}
            alt="here is my bitch"
          />
        </div>
        <form className="flex-1 flex flex-col min-w-64">
          <h1 className="text-2xl font-medium">Sign up</h1>
          <p className="text-sm text text-foreground">
            Already have an account?{" "}
            <Link
              className="text-primary font-medium underline"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>

          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="bg-purple border-purple placeholder-yellow text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
              className="bg-purple border-purple placeholder-yellow text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <SubmitButton
              formAction={signUpAction}
              pendingText="Signing up..."
              className="bg-yellow text-purple font-bold md:w-auto inline-flex mt-4"
            >
              Sign up
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </>
  );
}
