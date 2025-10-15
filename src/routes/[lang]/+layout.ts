import texts from '$lib/texts.json';

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ params }) => {
	const lang = params.lang;

	// This is the corrected line:
	// We tell TypeScript that 'lang' is a valid key of the 'texts' object.
	const t = texts[lang as keyof typeof texts] || texts.en;

	return {
		t: t
	};
};
