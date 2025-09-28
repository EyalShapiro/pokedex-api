import { Outlet } from "react-router";
import { ThemeProvider } from "../../context/ThemeContext";
import { LanguageProvider } from "../../context/LanguageContext";
import Header from "./Header";

export default function Layout() {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<div className="bg-background text-foreground min-h-screen">
					<Header />
					<main className="container mx-auto px-4 py-8">
						<Outlet />
					</main>
				</div>
			</LanguageProvider>
		</ThemeProvider>
	);
}
