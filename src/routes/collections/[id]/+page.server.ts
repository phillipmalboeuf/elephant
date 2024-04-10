import type { TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const [collection] = await Promise.all([
    content.getEntries<TypeCollectionSkeleton>({ content_type: "collection", include: 2, "fields.id": params.id, limit: 1 }),
  ])

  return {
    collection: collection.items[0],
  }
})