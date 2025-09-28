import { cn } from "@/utils/utils";
import { SelectHTMLAttributes } from "react";

type BaseSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function BaseSelect({ className, children, ...props }: BaseSelectProps) {
	return (
		<select
			{...props}
			className={cn(
				"border-input bg-background rounded-lg border px-4 py-2 text-sm shadow-sm",
				"focus:border-primary focus:ring-primary focus:ring-2 focus:outline-none",
				className
			)}
		>
			{children}
		</select>
	);
}
