import { Link } from "react-router";
import { Moon, Sun, Globe } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useToggleLanguage } from "@/hooks/useToggleLanguage";

function Header() {
	const { theme, toggleTheme } = useTheme();
	const { t } = useTranslation();
	const toggleLanguage = useToggleLanguage();
	return (
		<header className="bg-card border-b">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link to="/" className="text-primary text-2xl font-bold">
						Pokédex
					</Link>

					<nav className="hidden items-center space-x-6 md:flex">
						<Link to="/" className="hover:text-primary transition-colors">
							{t("nav.home")}
						</Link>
						<Link to="/items" className="hover:text-primary transition-colors">
							{t("nav.items")}
						</Link>
					</nav>

					<div className="flex items-center space-x-2">
						<button
							onClick={toggleTheme}
							className="hover:bg-accent rounded-lg p-2 transition-colors"
							title={t("theme.toggle")}
						>
							{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
						</button>

						<button
							onClick={toggleLanguage}
							className="hover:bg-accent rounded-lg p-2 transition-colors"
							title={t("language.toggle")}
						>
							<Globe size={20} />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
