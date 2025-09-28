import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useItemsList } from "@/api/pokeItem";
import { BaseInput } from "@/components/ui/BaseInput";
import { ItemCard } from "@/components/PokemonCard/ItemCard";

export default function ItemsPage() {
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState("");
	const { data: itemsData, isLoading, isError } = useItemsList(2100, 0);

	const filteredItems = useMemo(() => {
		if (!itemsData) return [];
		return itemsData.results.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [itemsData, searchTerm]);

	if (isLoading) return <div>{t("Loading items...")}</div>;

	if (isError) return <div>{t("Error fetching items")}</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-3xl font-bold">{t("Items")}</h1>
			<BaseInput
				type="text"
				placeholder={t("search-items")}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mb-8 w-full md:w-1/3"
			/>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
				{filteredItems.map((item) => (
					<ItemCard key={JSON.stringify(item)} item={item} />
				))}
			</div>
		</div>
	);
}
