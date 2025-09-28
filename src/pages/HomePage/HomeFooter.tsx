import { BaseSelect } from "@/components/ui/BaseSelect";
import { NextPageButton } from "@/components/ui/NextPageButton";
import { PokemonFiltersType } from "@/types/PokemonFiltersType";
import { useTranslation } from "react-i18next";
type HomeFooterProps = {
	updateFilter: (newValue: Partial<PokemonFiltersType>) => void;
	filters: PokemonFiltersType;
	total: number;
};
const PER_PAGE_OPTIONS = [10, 20, 50, 100];
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
				{PER_PAGE_OPTIONS.map((option) => (
					<option key={option} value={option}>
						{option} {t("per page")}
					</option>
				))}
			</BaseSelect>
		</div>
	);
}
