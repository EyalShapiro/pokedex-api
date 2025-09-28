import { Link } from "react-router";
import { type Pokemon } from "@/types/pokemon";
import { getPokemonIdShow } from "@/utils/pokemon";

interface PokemonCardProps {
	pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
	return (
		<Link
			to={`/pokemon/${pokemon.id}`}
			className="group relative rounded-lg border p-4 text-center transition-shadow hover:shadow-lg"
		>
			<span className="text-muted-foreground flex">{getPokemonIdShow(pokemon)}</span>
			<img
				src={pokemon.sprites.other["official-artwork"].front_default}
				alt={pokemon.name}
				className="mx-auto h-24 w-24 transform transition-transform duration-300 group-hover:scale-110"
			/>
			<p className="mt-2 font-semibold capitalize">{pokemon.name}</p>
		</Link>
	);
}
