import * as React from "react";

import { cn } from "@/utils/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ClearButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, type, ...props }, ref) => {
		return (
			<button
				type={type}
				className={cn(
					"text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
ClearButton.displayName = "Button";
