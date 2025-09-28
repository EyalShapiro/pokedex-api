import { useQuery } from "@tanstack/react-query";

import { getPokeItem, getPokeItemsList } from "@/api/pokeItem/function";
import type { Item } from "@/types/pokemon";

// Hook to get items list
export function useItemsList(limit = 20, offset = 1) {
	return useQuery({
		queryKey: ["items-list", limit, offset],
		queryFn: async () => getPokeItemsList(limit, offset),
	});
}

// Hook to get single item
export function useItem(idOrName: string | number) {
	return useQuery<Item>({
		queryKey: ["item", idOrName],
		queryFn: async () => getPokeItem(idOrName),
		enabled: !!idOrName,
	});
}
