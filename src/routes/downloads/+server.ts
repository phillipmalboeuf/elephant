import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'

export const GET: RequestHandler = async ({ url }) => {
	const files = url.searchParams.get('files')?.split(',')

  const asset = await content.getAsset(files[0], { locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' })

	return new Response(await (await fetch("https:"+asset.fields.file.url)).blob(), {
    headers: {
      "Content-type" : asset.fields.file.contentType,
      "Content-Disposition": `attachment; filename=${asset.fields.file.fileName}`
    }
  })
};