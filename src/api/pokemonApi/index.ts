import { useQuery } from "@tanstack/react-query";

import type { Pokemon, PokemonListResponse, PokemonSpecies, EvolutionChain } from "@/types/pokemon";

import {
	getPokemonList,
	getPokemon,
	getPokemonSpecies,
	getEvolutionChain,
	getPokemonByType,
	getPokemonByGeneration,
	getTypes,
	getGenerations,
	searchPokemon,
	getMove,
} from "./function";

// Hook to get Pokemon list
export function usePokemonList(limit = 20, offset = 0) {
	return useQuery<PokemonListResponse>({
		queryKey: ["pokemon-list", limit, offset],
		queryFn: () => getPokemonList(limit, offset),
	});
}

// Hook to get single Pokemon
export function usePokemon(idOrName: string | number) {
	return useQuery<Pokemon>({
		queryKey: ["pokemon", idOrName],
		queryFn: () => getPokemon(idOrName),
		enabled: !!idOrName,
	});
}

// Hook to get Pokemon species
export function usePokemonSpecies(idOrName: string | number) {
	return useQuery<PokemonSpecies>({
		queryKey: ["pokemon-species", idOrName],
		queryFn: () => getPokemonSpecies(idOrName),
		enabled: !!idOrName,
	});
}

// Hook to get evolution chain
export function useEvolutionChain(chainId: number) {
	return useQuery<EvolutionChain>({
		queryKey: ["evolution-chain", chainId],
		queryFn: () => getEvolutionChain(chainId),
		enabled: !!chainId,
	});
}

// Hook to get Pokemon by type
export function usePokemonByType(type: string) {
	return useQuery({
		queryKey: ["pokemon-by-type", type],
		queryFn: () => getPokemonByType(type),
		enabled: !!type,
	});
}

// Hook to get Pokemon by generation
export function usePokemonByGeneration(generation: string) {
	return useQuery({
		queryKey: ["pokemon-by-generation", generation],
		queryFn: () => getPokemonByGeneration(generation),
		enabled: !!generation,
	});
}

// Hook to get all types
export function usePokemonTypes() {
	return useQuery({ queryKey: ["pokemon-types"], queryFn: getTypes });
}

// Hook to get all generations
export function useGenerations() {
	return useQuery({ queryKey: ["generations"], queryFn: getGenerations });
}

// Hook to search Pokemon
export function useSearchPokemon(query: string, enabled = true) {
	return useQuery({
		queryKey: ["search-pokemon", query],
		queryFn: () => searchPokemon(query),
		enabled: enabled && query.length > 0,
	});
}

// Hook to get move details
export function useMove(idOrName: string | number) {
	return useQuery({
		queryKey: ["move", idOrName],
		queryFn: () => getMove(idOrName),
		enabled: !!idOrName,
	});
}

// Utility hook to get Pokemon with species data
export function usePokemonWithSpecies(idOrName: string | number) {
	const pokemonQuery = usePokemon(idOrName);
	const speciesQuery = usePokemonSpecies(idOrName);

	return {
		pokemon: pokemonQuery.data,
		species: speciesQuery.data,
		isLoading: pokemonQuery.isLoading || speciesQuery.isLoading,
		isError: pokemonQuery.isError || speciesQuery.isError,
		error: pokemonQuery.error || speciesQuery.error,
	};
}

// Alternative evolution chain hook
export function useGetEvolutionLin(id: string | number) {
	const { data } = usePokemonSpecies(id);
	return useQuery({
		queryKey: ["evolutionChain", data?.evolution_chain?.url],
		queryFn: async () => {
			if (!data?.evolution_chain?.url) throw new Error("No evolution chain URL found");
			const evolutionChainId = data.evolution_chain.url.split("/").slice(-2, -1)[0];
			return await getEvolutionChain(+evolutionChainId);
		},
		enabled: !!data?.evolution_chain?.url,
	});
}

export function usePokemonDetails(limit = 20, offset = 0) {
	const { data: pokemonData } = usePokemonList(limit, offset);

	return useQuery({
		queryKey: ["pokemonDetails", limit, offset],
		queryFn: async () => {
			if (!pokemonData) return [];
			const promises = pokemonData.results.map((p) => getPokemon(p.name));
			return Promise.all(promises);
		},
		enabled: !!pokemonData,
	});
}
