import type { TypePageSkeleton, TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  // const filter = url.searchParams.get("service")

  const [collections, pages, products] = await Promise.all([
    content.getEntries<TypeCollectionSkeleton>({ content_type: "collection", include: 2 }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": "products" }),
    url.searchParams?.size && content.getEntries<TypeProductSkeleton>({ content_type: "product", include: 2 }),
  ])

  return {
    collections,
    products,
    page: pages.items[0]
  }
})