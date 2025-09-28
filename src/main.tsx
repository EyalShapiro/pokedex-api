import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import ToastNotify from "./components/ToastNotify";
import MainRouter from "./router";
import "./i18n";
import ErrorBoundaryContext from "./context/ErrorBoundaryContext";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ErrorBoundaryContext>
				<MainRouter />
				<ToastNotify />
			</ErrorBoundaryContext>
		</QueryClientProvider>
	</React.StrictMode>
);
