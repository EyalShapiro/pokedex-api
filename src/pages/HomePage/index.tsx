import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePokemonDetails } from "@/api/pokemonApi";
import PokemonCard from "@/components/PokemonCard/PokemonCard";

import { PokemonFiltersType } from "@/types/PokemonFiltersType";
import { HomeFooter } from "./HomeFooter";
import { FilterBar } from "./filter";

const INIT_FILTER: PokemonFiltersType = {
	offset: 0,
	limit: 20,
	searchTerm: "",
	selectedTypes: [],
	selectedGeneration: "",
};

export default function HomePage() {
	const { t } = useTranslation();
	const [filters, setFilters] = useState<PokemonFiltersType>(INIT_FILTER);

	const { data: pokemonDetails, isError, isLoading } = usePokemonDetails(1500, 0);

	const updateFilter = (newValue: Partial<PokemonFiltersType>) => {
		setFilters((prev) => ({ ...prev, ...newValue }));
	};

	const filteredPokemon = useMemo(() => {
		if (!pokemonDetails) return [];
		let current = pokemonDetails;

		if (filters.searchTerm) {
			current = current.filter((p) =>
				p.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
			);
		}

		if (filters.selectedTypes.length > 0) {
			current = current.filter((p) =>
				filters.selectedTypes.every((t) => p.types.some((pt) => pt.type.name === t))
			);
		}

		return current;
	}, [pokemonDetails, filters]);

	if (isLoading) return <div>{t("Loading...")}</div>;
	if (isError) return <div>{t("Error fetching items")}</div>;

	const pokePaginated = filteredPokemon.slice(filters.offset, filters.offset + filters.limit);

	return (
		<div className="relative container mx-auto px-4 py-8">
			<h1 className="text-primary mb-4 text-4xl font-bold">{t("home.title")}</h1>
			<p className="text-muted-foreground mb-8">{t("home.context")}</p>
			<FilterBar filters={filters} updateFilter={updateFilter} />

			<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
				{pokePaginated.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
			<HomeFooter updateFilter={updateFilter} filters={filters} total={filteredPokemon.length} />
		</div>
	);
}
