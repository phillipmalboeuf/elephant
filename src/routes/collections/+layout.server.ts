
import { isTypeCollection, type TypeNavigationSkeleton, type TypePageSkeleton } from '$lib/clients/content_types.js'
import { cachedEntries } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime.js'

export const load = async ({ request }) => {

  const [pages] = await Promise.all([
    cachedEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": "products", locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' }),
  ])

  return {
    collections: pages.items[0].fields.content?.filter(isTypeCollection)
  }
}