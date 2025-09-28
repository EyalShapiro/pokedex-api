import * as React from "react";

import { cn } from "@/utils/utils";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
	({ className, type, ...props }, ref) => {
		return (
			<button
				type={type}
				className={cn(
					"flex items-center gap-2 rounded-lg px-4 py-2 opacity-90 transition-all",
					"fill-accent-foreground hover:opacity-100",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
BaseButton.displayName = "Button";
