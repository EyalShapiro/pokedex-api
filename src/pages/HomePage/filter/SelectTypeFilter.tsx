import { useTranslation } from "react-i18next";
import { XCircle } from "lucide-react";

import { usePokemonTypes } from "@/api/pokemonApi";
import { cn } from "@/utils/utils";
import { getColorByPokemonType, getSvgByPokemonType } from "@/utils/pokemon";
import ShowComponentSVG from "../../../components/ui/ShowComponentSVG";
import { ClearButton } from "../../../components/ui/ClearButton";

type Props = {
	setSelectedTypes: (newValue: string[]) => void;
	selectedTypes: string[];
};

export function SelectTypeFilter({ setSelectedTypes, selectedTypes }: Props) {
	const { data: typesData } = usePokemonTypes();
	const { t } = useTranslation();
	const handleTypeChange = (type: string) => {
		const st = selectedTypes.includes(type)
			? selectedTypes.filter((t) => t !== type)
			: [...selectedTypes, type].slice(0, 2);
		setSelectedTypes(st);
	};
	return (
		<div className="flex flex-wrap gap-2">
			{typesData?.results.map((type) => {
				const translated = t(`types.${type.name}`);
				const label = translated.startsWith("types.") ? type.name : translated;
				const isSelect = selectedTypes.includes(type.name);
				return (
					<button
						key={type.name}
						onClick={() => handleTypeChange(type.name)}
						style={{ backgroundColor: getColorByPokemonType(type.name) }}
						className={cn(
							"flex items-center gap-2 rounded-lg px-4 py-2 opacity-90 transition-all",
							"fill-accent-foreground hover:opacity-100",
							isSelect && `outline-accent opacity-100 outline-2`
						)}
					>
						<ShowComponentSVG
							SVGProps={{
								width: 20,
								height: 20,
								className: isSelect ? "fill-accent-foreground" : "",
							}}
							SVGComponent={getSvgByPokemonType(type.name)}
						/>
						<span className="capitalize">{label}</span>
					</button>
				);
			})}

			{selectedTypes.length > 0 && (
				<ClearButton onClick={() => setSelectedTypes([])} className="">
					<XCircle className="h-4 w-4" />
					<span>{t("clear-type")}</span>
				</ClearButton>
			)}
		</div>
	);
}
