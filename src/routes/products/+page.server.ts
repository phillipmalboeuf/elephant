import { type TypePageSkeleton, type TypeCollectionSkeleton, type TypeProductSkeleton, type TypeModelSkeleton, isTypeCollection } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime.js'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const budgetFilter = url.searchParams.get("budget")
  const ageFilter = url.searchParams.get("age")
  const heightFilter = url.searchParams.get("height")
  const xFilter = url.searchParams.get("x")
  const yFilter = url.searchParams.get("y")
  const typeFilter = url.searchParams.get("type")

  const [pages, products, models] = await Promise.all([
    // content.getEntries<TypeCollectionSkeleton>({ content_type: "collection", include: 2 }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": "products", locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' }),
    url.searchParams?.size && content.getEntries<TypeProductSkeleton>({
      content_type: "product", include: 2, limit: 300, locale: { fr: 'fr-CA' }[languageTag()] || 'en-US',
      "fields.models[exists]": true,
      ...budgetFilter ? {
        "fields.price": budgetFilter,
      } : {},
      ...ageFilter ? {
        "fields.ageMin[gte]": ageFilter.split('-')[0],
        // "fields.ageMax[lte]": ageFilter.split('-')[1]
      } : {},
      ...typeFilter ? {
        "fields.types": typeFilter
      } : {},
    }),
    url.searchParams?.size && (heightFilter || xFilter || yFilter) && content.getEntries<TypeModelSkeleton>({
      content_type: "model", limit: 300, locale: { fr: 'fr-CA' }[languageTag()] || 'en-US',
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
    collections: pages.items[0].fields.content?.filter(isTypeCollection),
    products: (heightFilter || xFilter || yFilter) ? {
      ...products,
      items: products.items.filter(product => product.fields.models.find(m => models.items.find(model => model.sys.id === m.sys.id)))
    } : products,
    page: pages.items[0]
  }
})