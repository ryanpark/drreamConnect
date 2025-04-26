import {
  signInAction,
  signUpFacebookAction,
  signUpGoogleAction,
} from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-satoshi mb-10 pl-10 pr-10">
        Explore, understand, and connect over dreams
      </h1>
      <div className="p-10 rounded-md bg-darkPurple shadow-md relative">
        <form className="flex-1 flex flex-col min-w-64">
          <div className="absolute right-[-107px] top-[-200px]">
            <Image
              src="/bitch.png"
              width={175}
              height={349}
              alt="here is my bitch"
            />
          </div>
          <h1 className="text-2xl text-center">Sign in</h1>
          <p className="text-sm text-foreground text-center mb-5">
            Don't have an account?{" "}
            <Link
              className="text-foreground font-medium underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-purple border-purple placeholder-yellow text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="you@example.com"
              name="email"
              required
            />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              className="bg-purple border-purple placeholder-yellow text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Your password"
              type="password"
              name="password"
              required
            />

            <SubmitButton
              pendingText="Signing In..."
              formAction={signInAction}
              className="bg-yellow text-purple font-bold md:w-auto inline-flex mt-4"
            >
              Sign in
            </SubmitButton>
            <div className="pt-10 pb-10 text-center">- Or Sign In with -</div>

            {/* Facebook Sign-Up Button */}
            <div className="flex justify-evenly">
              <Button
                onClick={signUpFacebookAction}
                className="bg-yellow text-purple font-bold md:w-auto inline-flex"
                variant="outline"
              >
                <Image
                  src="/facebook.svg"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
                Sign up with Facebook
              </Button>
              <Button
                onClick={signUpGoogleAction}
                className="bg-yellow text-purple font-bold md:w-auto inline-flex"
                variant="outline"
              >
                <Image
                  src="/google.svg"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
                Sign up with Google
              </Button>
            </div>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
