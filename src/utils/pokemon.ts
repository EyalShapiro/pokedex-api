// Utility functions for Pokemon data manipulation

import { GENERATION_LIMITS } from "@/constant/generation";
import { STAT_NAMES } from "@/constant/statNames";
import { TYPE_COLORS, TYPE_ICONS } from "@/constant/types-info";
import { Pokemon } from "@/types/pokemon";
import { TypesPokemonType } from "@/types/typesPokemon";
import { TypeIcon } from "lucide-react";
import { SVGProps } from "react";

export const formatPokemonName = (name: string): string => {
	return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
};

export const formatPokemonId = (id: number): string => {
	return `#${id.toString().padStart(3, "0")}`;
};
const DEFAULT_COLOR = "#68A090";
export const getColorByPokemonType = (type: TypesPokemonType | string): string => {
	const typeName = type.trim().toLowerCase();
	return typeName in TYPE_COLORS ? TYPE_COLORS[typeName as TypesPokemonType] : DEFAULT_COLOR;
};

export const getSvgByPokemonType = (
	type: TypesPokemonType | string
): React.FC<SVGProps<SVGSVGElement>> | undefined => {
	const typeName = type.trim().toLowerCase();
	return typeName in TYPE_ICONS ? TYPE_ICONS[typeName as TypesPokemonType] : undefined;
};
export const getStatName = (statName: string): string => {
	return STAT_NAMES[statName] || statName;
};

export const calculateStatPercentage = (baseStat: number, maxStat = 255): number => {
	return Math.min((baseStat / maxStat) * 100, 100);
};

export function getGenerationFromId(id: number): number {
	for (const [gen, max] of Object.entries(GENERATION_LIMITS)) {
		if (id <= max) return Number(gen);
	}
	return 9; // fallback
}
export const formatHeight = (height: number): string => {
	const meters = height / 10;
	return `${meters} m`;
};

export const formatWeight = (weight: number): string => {
	const kilograms = weight / 10;
	return `${kilograms} kg`;
};

export const getEvolutionTriggerText = (trigger: string, minLevel?: number | null): string => {
	switch (trigger) {
		case "level-up":
			return minLevel ? `Level ${minLevel}` : "Level up";
		case "trade":
			return "Trade";
		case "use-item":
			return "Use item";
		case "shed":
			return "Shed";
		default:
			return "Unknown";
	}
};

export const filterPokemonByTypes = (pokemonList: any[], selectedTypes: string[]) => {
	if (selectedTypes.length === 0) return pokemonList;

	return pokemonList.filter((pokemon) => {
		if (!pokemon.types) return false;

		const pokemonTypes = pokemon.types.map((t: any) => t.type.name);

		// If only one type selected, Pokemon must have that type
		if (selectedTypes.length === 1) {
			return pokemonTypes.includes(selectedTypes[0]);
		}

		// If two types selected, Pokemon must have both types
		return selectedTypes.every((type) => pokemonTypes.includes(type));
	});
};

export function sortPokemonByName<T extends { name: string }>(
	pokemonList: T[],
	ascending = true
): T[] {
	return [...pokemonList].sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();
		return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
	});
}

export function sortPokemonById<T extends { id: number }>(pokemonList: T[], ascending = true): T[] {
	return [...pokemonList].sort((a, b) => (ascending ? a.id - b.id : b.id - a.id));
}
export const getPokemonIdShow = (pokemon: Pokemon | number | string) => {
	const id = typeof pokemon === "object" ? pokemon.id : pokemon;
	return `#${id.toString().padStart(3, "0")}`;
};
