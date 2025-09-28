import { Link } from "react-router";
import { EvolutionChain } from "@/types/pokemon";
import { getPokemonIdShow } from "@/utils/pokemon";
import { usePokemon } from "@/api/pokemonApi";

interface EvolutionChainProps {
	chain: EvolutionChain["chain"];
}

export default function EvolutionChainComponent({ chain }: EvolutionChainProps) {
	const { data, isError } = usePokemon(chain.species.name);
	// console.log("data", p.data);
	if (!data?.id || isError) return null;
	const pokemonId = data?.id || 0;
	return (
		<div className="flex items-center">
			<Link to={`/pokemon/${pokemonId}`} className="text-center">
				<span className="text-sm">{getPokemonIdShow(pokemonId)}</span>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
					alt={chain.species.name}
					className="mx-auto h-24 w-24"
				/>
				<p className="capitalize">{chain.species.name}</p>
			</Link>
			{chain.evolves_to.length > 0 && (
				<div className="flex items-center">
					<span className="mx-4 text-2xl">&rarr;</span>
					<div className="flex flex-col gap-4">
						{chain.evolves_to.map((evolution) => (
							<EvolutionChainComponent key={evolution.species.name} chain={evolution} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
