"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { cn } from "@/lib/utils";

interface MobileSlideMenuProps {
  nick_name: string;
  isAuthenticated: boolean;
}

const MobileSlideMenu = ({
  nick_name,
  isAuthenticated,
}: MobileSlideMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="relative z-50">
      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-purple gap-2"
      >
        <Menu className="h-4 w-4 text-yellow" />
      </Button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide menu */}
      <div
        className={cn(
          "fixed inset-0 w-full h-full bg-purple transform transition-transform duration-500 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-10 w-10 rounded-full hover:bg-purple/20"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-8 p-6">
          {isAuthenticated ? (
            <>
              <div className="text-2xl font-bold mb-4 animate-fadeIn">
                Hey, {nick_name || "Dreamer"}
              </div>
              <MenuLink
                href="/mydreams"
                onClick={handleLinkClick}
                delay="delay-[100ms]"
              >
                My diary
              </MenuLink>
              <MenuLink
                href="/dreams"
                onClick={handleLinkClick}
                delay="delay-[200ms]"
              >
                Explore dreams
              </MenuLink>
              <MenuLink
                href="/profile"
                onClick={handleLinkClick}
                delay="delay-[300ms]"
              >
                Profile
              </MenuLink>
              <div className="h-px w-3/4 bg-border my-4 animate-fadeIn delay-[400ms]" />
              <form
                action={signOutAction}
                className="w-full flex justify-center animate-fadeIn delay-[500ms]"
              >
                <button
                  type="submit"
                  className="text-xl py-6 w-3/4 border-purple hover:bg-purple/10 bg-purple"
                  onClick={handleLinkClick}
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <MenuLink
                href="/dreams"
                onClick={handleLinkClick}
                delay="delay-[100ms]"
              >
                Explore dreams
              </MenuLink>
              <MenuLink
                href="/sign-in"
                onClick={handleLinkClick}
                delay="delay-[200ms]"
              >
                Sign in
              </MenuLink>
              <MenuLink
                href="/sign-up"
                onClick={handleLinkClick}
                highlight
                delay="delay-[300ms]"
              >
                Sign up
              </MenuLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  highlight?: boolean;
  delay?: string;
}

const MenuLink = ({
  href,
  children,
  onClick,
  highlight,
  delay = "delay-0",
}: MenuLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-xl md:text-2xl font-medium py-3 px-8 w-3/4 text-center rounded-full transition-all duration-300 transform hover:scale-105",
        "animate-fadeIn animate-slideIn",
        delay,
        highlight
          ? "bg-purple text-white hover:bg-purple/90"
          : "hover:bg-yellow"
      )}
    >
      {children}
    </Link>
  );
};

export default MobileSlideMenu;
