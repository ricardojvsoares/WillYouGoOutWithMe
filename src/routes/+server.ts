import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET() {
	// Redirect from the root to the default language
	throw redirect(307, '/en');
}
