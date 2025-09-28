import React from "react";
import { BaseButton } from "@/components/ui/BaseButton";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

export default function ErrorBoundaryContext({ children }: { children: React.ReactNode }) {
	const { reset } = useQueryErrorResetBoundary();
	return (
		<ErrorBoundary
			onReset={reset}
			fallbackRender={({ resetErrorBoundary }) => (
				<div>
					There was an error!
					<BaseButton onClick={() => resetErrorBoundary()}>Try again</BaseButton>
				</div>
			)}
		>
			{children}
		</ErrorBoundary>
	);
}
