// file initialized by the Paraglide-SvelteKit CLI - Feel free to edit it
import { sequence } from "@sveltejs/kit/hooks"
import { i18n } from "$lib/i18n"

import type { Handle } from '@sveltejs/kit';

export const cache: Handle = async ({ event, resolve }) => {

	const response = await resolve(event);

  response.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600000');
  response.headers.set('Cache-Control', 'max-age=3600000');
  response.headers.set('Etag', `"${process.env.VERCEL_URL || 'dev'}"`);

	return response;
};

// add your own hooks as part of the sequence here
export const handle = sequence(i18n.handle(), cache)
