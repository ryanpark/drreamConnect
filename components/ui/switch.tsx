"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchVariants = cva(
	"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out peer disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			checked: {
				true: "bg-black",
				false: "bg-white",
			},
		},
		defaultVariants: {
			checked: false,
		},
	},
);

const thumbVariants = cva(
	"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-purple shadow-lg ring-0 transition duration-200 ease-in-out",
	{
		variants: {
			checked: {
				true: "translate-x-5 bg-yellow",
				false: "translate-x-0",
			},
		},
		defaultVariants: {
			checked: false,
		},
	},
);

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> &
		VariantProps<typeof switchVariants>
>(({ className, checked, ...props }, ref) => (
	<SwitchPrimitive.Root
		ref={ref}
		className={cn(switchVariants({ checked }), className)}
		checked={checked}
		{...props}
	>
		<SwitchPrimitive.Thumb className={cn(thumbVariants({ checked }))} />
	</SwitchPrimitive.Root>
));

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
