"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOutAction } from "@/app/actions";

interface MobileDropdownMenuProps {
  nick_name: string;
  isAuthenticated: boolean;
}

const MobileDropdownMenu = ({
  nick_name,
  isAuthenticated,
}: MobileDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="flex items-center bg-purple gap-2">
          {/* {isAuthenticated ? `Hey, ${nick_name || "User"}` : "Menu"} */}
          <Menu className="h-4 w-4 text-yellow" />
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
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full text-left"
                >
                  <Link href=""> Sign out</Link>
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
