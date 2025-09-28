import { Item, PokeItemsList } from "@/types/pokemon";
import axiosInstance from "../axiosInstance";

export async function getPokeItem(idOrName: string | number): Promise<Item> {
	const response = await axiosInstance.get(`/item/${idOrName}`);
	return response.data;
}

export async function getPokeItemsList(limit = 20, offset = 0) {
	const response = await axiosInstance.get<PokeItemsList>(`/item`, {
		params: { limit, offset },
	});

	return response.data;
}
