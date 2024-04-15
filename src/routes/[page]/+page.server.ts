import type { TypeCollectionSkeleton, TypePageSkeleton, TypeProductSkeleton, TypeProjectSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {

  const [page] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": params.page, limit: 1 }),
  ])

  return {
    page: page.items[0],
  }
})