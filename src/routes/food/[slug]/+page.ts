import { error, type Load } from '@sveltejs/kit';
import menuItems, { type Food } from '$lib/menuItems';
import { urlHashFromName } from '$lib/url';

export const load: Load = async ({ params }) => {
	let food: Food | undefined = undefined;
	for (const cat of menuItems) {
		for (const f of cat.items) {
			const fName = urlHashFromName(f.name);
			if (fName === params.slug) {
				food = f;
				break;
			}
		}
		if (food !== undefined) break;
	}
	if (food === undefined) {
		throw error(404, `Food ${params.slug} not found`);
	}
	return {
		food
	};
};
