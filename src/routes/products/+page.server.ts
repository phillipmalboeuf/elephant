import type { TypePageSkeleton, TypeCollectionSkeleton, TypeProductSkeleton, TypeModelSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const ageFilter = url.searchParams.get("age")
  const heightFilter = url.searchParams.get("height")
  const xFilter = url.searchParams.get("x")
  const yFilter = url.searchParams.get("y")

  const [collections, pages, products, models] = await Promise.all([
    content.getEntries<TypeCollectionSkeleton>({ content_type: "collection", include: 2 }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": "products" }),
    url.searchParams?.size && content.getEntries<TypeProductSkeleton>({
      content_type: "product", include: 2, limit: 300,
      "fields.models[exists]": true,
      ...ageFilter ? {
        "fields.ageMin[gte]": ageFilter.split('-')[0],
        // "fields.ageMax[lte]": ageFilter.split('-')[1]
      } : {},
    }),
    url.searchParams?.size && (heightFilter || xFilter || yFilter) && content.getEntries<TypeModelSkeleton>({
      content_type: "model", limit: 300,
      ...heightFilter ? {
        "fields.height[gte]": heightFilter.split('-')[0],
        "fields.height[lte]": heightFilter.split('-')[1]
      } : {},
      ...xFilter ? {
        "fields.surfaceX[gte]": xFilter.split('-')[0],
        "fields.surfaceX[lte]": xFilter.split('-')[1]
      } : {},
      ...yFilter ? {
        "fields.surfaceY[gte]": yFilter.split('-')[0],
        "fields.surfaceY[lte]": yFilter.split('-')[1]
      } : {},
    }),
  ])

  return {
    collections,
    products: (heightFilter || xFilter || yFilter) ? {
      ...products,
      items: products.items.filter(product => product.fields.models.find(m => models.items.find(model => model.sys.id === m.sys.id)))
    } : products,
    page: pages.items[0]
  }
})