import {
	EvolutionChain,
	Generation,
	Move,
	Pokemon,
	PokemonListResponse,
	PokemonSpecies,
	PokemonType,
} from "@/types/pokemon";
import axiosInstance from "../axiosInstance";

// Get Pokemon list with pagination
export const getPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
	const response = await axiosInstance.get(`/pokemon?limit=${limit}&offset=${offset}`);
	return response.data;
};

// Get Pokemon by ID or name
export const getPokemon = async (idOrName: string | number): Promise<Pokemon> => {
	const response = await axiosInstance.get(`/pokemon/${idOrName}`);
	return response.data;
};

// Get Pokemon species data
export const getPokemonSpecies = async (idOrName: string | number): Promise<PokemonSpecies> => {
	const response = await axiosInstance.get(`/pokemon-species/${idOrName}`);
	return response.data;
};

// Get evolution chain
export const getEvolutionChain = async (id: number): Promise<EvolutionChain> => {
	const response = await axiosInstance.get(`/evolution-chain/${id}`);
	return response.data;
};

// Get Pokemon by type
export const getPokemonByType = async (type: string): Promise<PokemonType> => {
	const response = await axiosInstance.get(`/type/${type}`);
	return response.data;
};

// Get Pokemon by generation
export const getPokemonByGeneration = async (generation: string): Promise<Generation> => {
	const response = await axiosInstance.get(`/generation/${generation}`);
	return response.data;
};

// Get move details
export const getMove = async (idOrName: string | number): Promise<Move> => {
	const response = await axiosInstance.get(`/move/${idOrName}`);
	return response.data;
};

// Get all Pokemon types
export const getTypes = async (): Promise<{ results: Array<{ name: string; url: string }> }> => {
	const response = await axiosInstance.get("/type");
	return response.data;
};

// Get all generations
export const getGenerations = async (): Promise<{
	results: Array<{ name: string; url: string }>;
}> => {
	const response = await axiosInstance.get("/generation");
	return response.data;
};

// Search Pokemon by name (client-side filtering)
export const searchPokemon = async (query: string, limit = 1000): Promise<PokemonListResponse> => {
	const response = await axiosInstance.get(`/pokemon?limit=${limit}`);
	const filteredResults = response.data.results.filter((pokemon: { name: string }) =>
		pokemon.name.toLowerCase().includes(query.toLowerCase())
	);
	return {
		...response.data,
		results: filteredResults,
		count: filteredResults.length,
	};
};
