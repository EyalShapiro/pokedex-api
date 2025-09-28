import { useItem } from "@/api/pokeItem";

export function ItemCard({ item }: { item: { name: string; url: string } }) {
	const { data: itemData } = useItem(item.name);
	return (
		<div className="group rounded-lg border p-4 text-center transition-shadow hover:shadow-lg">
			{itemData && (
				<img src={itemData.sprites.default} alt={itemData.name} className="mx-auto h-24 w-24" />
			)}
			<p className="mt-2 font-semibold capitalize">{item.name}</p>
		</div>
	);
}
