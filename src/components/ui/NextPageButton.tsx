import * as React from "react";

import { cn } from "@/utils/utils";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const NextPageButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
	({ className, type, ...props }, ref) => {
		return (
			<button
				type={type}
				className={cn("rounded-lg border px-4 py-2 disabled:opacity-50", className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
NextPageButton.displayName = "Button";
