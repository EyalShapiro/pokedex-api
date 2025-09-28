export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	base_experience: number;
	sprites: {
		front_default: string;
		front_shiny: string;
		other: { ["official-artwork"]: { front_default: string }; home: { front_default: string } };
	};
	types: Array<{ slot: number; type: { name: string; url: string } }>;
	stats: Array<{ base_stat: number; effort: number; stat: { name: string; url: string } }>;
	abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>;
	moves: Array<{
		move: { name: string; url: string };
		version_group_details: Array<{
			level_learned_at: number;
			move_learn_method: { name: string; url: string };
			version_group: { name: string; url: string };
		}>;
	}>;
	species: { name: string; url: string };
}

export type PokemonListItem = { name: string; url: string };

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonListItem[];
}

export interface PokemonSpecies {
	id: number;
	name: string;
	evolution_chain: { url: string };
	flavor_text_entries: Array<{
		flavor_text: string;
		language: PokemonListItem;
		version: PokemonListItem;
	}>;
}

export interface EvolutionChain {
	id: number;
	chain: {
		evolution_details: Array<{ min_level: number | null; trigger: PokemonListItem }>;
		evolves_to: Array<{
			evolution_details: Array<{ min_level: number | null; trigger: PokemonListItem }>;
			evolves_to: Array<any>;
			species: PokemonListItem;
		}>;
		species: PokemonListItem;
	};
}

export interface PokemonType {
	id: number;
	name: string;
	pokemon: Array<{ pokemon: PokemonListItem; slot: number }>;
}

export type Generation = {
	id: number;
	name: string;
	pokemon_species: PokemonListItem[];
};

export interface Move {
	id: number;
	name: string;
	accuracy: number | null;
	power: number | null;
	pp: number;
	priority: number;
	type: PokemonListItem;
	damage_class: PokemonListItem;
	effect_entries: Array<{ effect: string; language: PokemonListItem }>;
}

export interface Item {
	id: number;
	name: string;
	cost: number;
	sprites: { default: string };
	effect_entries: Array<{ effect: string; language: PokemonListItem }>;
	category: PokemonListItem;
}
export interface PokeItemsList {
	results: PokemonListItem[];
	count: 2180;
	next: string;
	previous: null;
}
