import { createContext, ReactNode, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

type Language = "en" | "he";

interface LanguageContextType {
	language: Language;
	changeLanguage: (lang: Language) => void;
	toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const { i18n } = useTranslation();
	const language = i18n.language.startsWith("he") ? "he" : "en";

	const changeLanguage = (lang: Language) => {
		i18n.changeLanguage(lang);
		document.documentElement.dir = i18n.dir(lang);
	};

	const toggleLanguage = () => {
		const newLanguage = language === "en" ? "he" : "en";
		changeLanguage(newLanguage);
	};

	useEffect(() => {
		document.documentElement.dir = i18n.dir(language);
	}, [language, i18n]);

	return (
		<LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};
