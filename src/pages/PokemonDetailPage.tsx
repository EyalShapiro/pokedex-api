import { useGetEvolutionLin, usePokemon } from "@/api/pokemonApi";
import { useParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import EvolutionChainComponent from "@/components/EvolutionChain";
import { getStatName } from "@/utils/pokemon";
import ViewPokemonTypes from "@/components/ViewPokemonTypes";

export default function PokemonDetailsPage() {
	const { id } = useParams();
	const { t } = useTranslation();
	const { data, isLoading, isError } = usePokemon(id ?? "");

	const { data: evolutionChainData } = useGetEvolutionLin(id ?? "");

	if (isLoading) return <div>{t("Loading Pokemon details...")}</div>;
	if (isError || !data) return <div>{t("Could not load Pokemon.")}</div>;

	const nextPokemonId = data.id + 1;
	const prevPokemonId = data.id - 1;

	return (
		<div>
			<div className="flex items-center justify-between">
				{prevPokemonId > 0 && (
					<Link to={`/pokemon/${prevPokemonId}`} className="text-blue-500">
						&lt; {t("Previous")}
					</Link>
				)}
				<h2 className="text-3xl font-bold capitalize">
					{data.name} <span className="text-sm text-slate-500">#{data.id}</span>
				</h2>
				<Link to={`/pokemon/${nextPokemonId}`} className="text-blue-500">
					{t("Next")} &gt;
				</Link>
			</div>

			<div className="mt-4 flex flex-col gap-6 md:flex-row">
				<img
					src={data.sprites.other["official-artwork"].front_default}
					alt={data.name}
					className="w-full md:w-1/3"
				/>
				<div className="w-full md:w-2/3">
					<h3 className="font-semibold">{t("Types")}</h3>
					<div className="mt-2 flex gap-2">
						{data.types.map((pokeType) => (
							<ViewPokemonTypes pokeType={pokeType} key={pokeType.type.name} />
						))}
					</div>

					<h3 className="mt-4 font-semibold">{t("Stats")}</h3>
					<ul>
						{data.stats.map((s) => (
							<li key={s.stat.name}>
								{t(`stats.${getStatName(s.stat.name)}`)}: {s.base_stat}
							</li>
						))}
					</ul>
				</div>
			</div>

			{evolutionChainData && (
				<section className="mt-6">
					<h3 className="font-semibold">{t("Evolution Chain")}</h3>
					<EvolutionChainComponent chain={evolutionChainData.chain} />
				</section>
			)}

			<section className="mt-6">
				<h3 className="font-semibold">{t("Moves")}</h3>
				<ul className="mt-2 max-h-56 overflow-auto">
					{data.moves.map((m, i) => (
						<li key={i} className="border-b py-1">
							{m.move.name}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
