import { BaseSelect } from "@/components/ui/BaseSelect";
import { NextPageButton } from "@/components/ui/NextPageButton";
import { PokemonFiltersType } from "@/types/PokemonFiltersType";
import { useTranslation } from "react-i18next";
type HomeFooterProps = {
	updateFilter: (newValue: Partial<PokemonFiltersType>) => void;
	filters: PokemonFiltersType;
	total: number;
};

export function HomeFooter({ updateFilter, filters, total }: HomeFooterProps) {
	const { t } = useTranslation();

	return (
		<div className="sticky mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
			<div className="flex items-center gap-4">
				<NextPageButton
					onClick={() =>
						updateFilter({
							offset: Math.max(0, filters.offset - filters.limit),
						})
					}
					disabled={filters.offset === 0}
				>
					{t("Previous")}
				</NextPageButton>
				<span>
					{t("Page")} {filters.offset / filters.limit + 1}
				</span>
				<NextPageButton
					onClick={() =>
						updateFilter({
							offset: filters.offset + filters.limit,
						})
					}
					disabled={filters.offset + filters.limit >= total}
				>
					{t("Next")}
				</NextPageButton>
			</div>

			<BaseSelect
				value={filters.limit}
				onChange={(e) =>
					updateFilter({
						limit: Number(e.target.value),
						offset: 0,
					})
				}
			>
				<option value={10}>10 {t("per page")}</option>
				<option value={20}>20 {t("per page")}</option>
				<option value={50}>50 {t("per page")}</option>
				<option value={100}>100 {t("per page")}</option>
			</BaseSelect>
		</div>
	);
}
