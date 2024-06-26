import type { TypePageSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime.js'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  if (!url.searchParams.has('query')) return
  
  const [products] = await Promise.all([
    content.getEntries<TypeProductSkeleton>({ content_type: "product", include: 2, "query": url.searchParams.get('query'), locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' }),
  ])

  return {
    products
  }
})