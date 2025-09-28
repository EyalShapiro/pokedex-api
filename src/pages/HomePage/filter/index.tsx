import { SearchFilter } from "./SearchFilter";
import { GenerationFilter } from "./GenerationFilter";
import { SelectTypeFilter } from "./SelectTypeFilter";
import { PokemonFiltersType } from "@/types/PokemonFiltersType";

export type FilterBarProps = {
	filters: PokemonFiltersType;
	updateFilter: (newValue: Partial<PokemonFiltersType>) => void;
};

export function FilterBar({ filters, updateFilter }: FilterBarProps) {
	return (
		<div className="mb-8 flex flex-col flex-wrap gap-4 md:flex-row">
			<div className="flex w-full flex-col gap-2 md:w-1/3">
				<SearchFilter searchTerm={filters.searchTerm} updateFilter={updateFilter} />
				<GenerationFilter
					selectedGeneration={filters.selectedGeneration}
					updateFilter={updateFilter}
				/>
			</div>

			<SelectTypeFilter
				selectedTypes={filters.selectedTypes}
				setSelectedTypes={(s) => updateFilter({ selectedTypes: s, offset: 0 })}
			/>
		</div>
	);
}
