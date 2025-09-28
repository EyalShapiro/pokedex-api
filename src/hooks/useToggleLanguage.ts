import { useLanguage } from "@/context/LanguageContext";

export const useToggleLanguage = () => {
	const { toggleLanguage } = useLanguage();

	return toggleLanguage;
};
