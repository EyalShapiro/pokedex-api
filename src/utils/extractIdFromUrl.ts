export const extractIdFromUrl = (url: string): number => {
	const matches = url.match(/\/(\d+)\/$/);
	return matches ? parseInt(matches[1], 10) : 0;
};

//todo:deleat
