import { useTranslation } from "react-i18next";
import { BaseSelect } from "@/components/ui/BaseSelect";
import { useGenerations } from "@/api/pokemonApi";
import { PokemonFiltersType } from "@/types/PokemonFiltersType";

type Props = {
	selectedGeneration: string;
	updateFilter: (newValue: Partial<PokemonFiltersType>) => void;
};

export function GenerationFilter({ selectedGeneration, updateFilter }: Props) {
	const { t } = useTranslation();
	const { data: generationsData } = useGenerations();

	return (
		<BaseSelect
			value={selectedGeneration}
			onChange={(e) => updateFilter({ selectedGeneration: e.target.value, offset: 0 })}
		>
			<option value="">{t("All Generations")}</option>
			{generationsData?.results.map((gen) => (
				<option key={gen.name} value={gen.name}>
					{t(`generations.${gen.name}`)}
				</option>
			))}
		</BaseSelect>
	);
}
