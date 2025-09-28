import { Pokemon } from "@/types/pokemon";
import { getColorByPokemonType, getSvgByPokemonType } from "@/utils/pokemon";
import ShowComponentSVG from "./ui/ShowComponentSVG";

export default function ViewPokemonTypes({ pokeType }: { pokeType: Pokemon["types"][0] }) {
	return (
		<div
			className="flex items-center gap-1 rounded px-2 py-1 text-white"
			style={{ backgroundColor: getColorByPokemonType(pokeType.type.name) }}
		>
			<span className="mr-1">{pokeType.type.name}</span>
			<ShowComponentSVG
				SVGProps={{ width: 15, height: 15 }}
				SVGComponent={getSvgByPokemonType(pokeType.type.name)}
			/>
		</div>
	);
}
