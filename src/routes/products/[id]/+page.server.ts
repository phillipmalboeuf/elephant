import type { TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime.js'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const [product] = await Promise.all([
    content.getEntries<TypeProductSkeleton>({ content_type: "product", include: 2, "fields.id": params.id, limit: 1, locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' }),
  ])

  return {
    product: product.items[0],
    collection: undefined as Entry<TypeCollectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // projets: projet.items[0].fields.services?.length && await content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 1, "fields.id[ne]": params.id, limit: 3, links_to_entry: projet.items[0].fields.services[0].sys.id }),
    // projets: projet.items[0].fields.services?.length && await content.getEntries<TypeProjetSkeleton>({ content_type: "projet", include: 1, limit: 3, links_to_entry: projet.items[0].fields.services[0].sys.id }),
    // services: Object.values(services).sort((a, b) => b.count - a.count)
  }
})