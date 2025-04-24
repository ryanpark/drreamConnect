"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOutAction } from "@/app/actions";

const MobileDropdownMenu = ({ nick_name, isAuthenticated }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="soft" className="flex items-center gap-2">
          {isAuthenticated ? `Hey, ${nick_name || "User"}` : "Menu"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/mydreams">My diary</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dreams">Explore dreams</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" className="w-full text-left">
                  Sign out
                </Button>
              </form>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/dreams">Explore dreams</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-in">Sign in</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-up">Sign up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileDropdownMenu;