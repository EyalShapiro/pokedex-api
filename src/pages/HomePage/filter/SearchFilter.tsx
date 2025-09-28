import { useTranslation } from "react-i18next";
import { BaseInput } from "@/components/ui/BaseInput";
import { PokemonFiltersType } from "@/types/PokemonFiltersType";

type Props = {
	searchTerm: string;
	updateFilter: (newValue: Partial<PokemonFiltersType>) => void;
};

export function SearchFilter({ searchTerm, updateFilter }: Props) {
	const { t } = useTranslation();

	return (
		<BaseInput
			type="text"
			placeholder={t("search-pokemon")}
			value={searchTerm}
			onChange={(e) => updateFilter({ searchTerm: e.target.value, offset: 0 })}
			className="w-full"
		/>
	);
}
