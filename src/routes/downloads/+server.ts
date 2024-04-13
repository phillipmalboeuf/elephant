import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { content } from '$lib/clients/contentful';

export const GET: RequestHandler = async ({ url }) => {
	const files = url.searchParams.get('files')?.split(',')

  const asset = await content.getAsset(files[0])

	return new Response(await (await fetch("https:"+asset.fields.file.url)).blob(), {
    headers: {
      "Content-type" : asset.fields.file.contentType,
      "Content-Disposition": `attachment; filename=${asset.fields.file.fileName}`
    }
  })
};