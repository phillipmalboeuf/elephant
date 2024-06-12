import type { TypePageSkeleton, TypeCollectionSkeleton, TypeProductSkeleton, TypeProjectSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime.js'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const filter = url.searchParams.get("category")

  const all = await content.getEntries<TypeProjectSkeleton>({ content_type: "project", include: 1, select: ["fields.categories"], limit: 200, locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' })

  let categories: {[id: string]: {
    id: string,
    sys: string,
    title: string,
    count: number
  }} = {}

  all.items.forEach(projet => {
    projet.fields.categories?.forEach(category => {
      if (categories[category.fields.id]) {
        categories[category.fields.id].count += 1
      } else {
        categories[category.fields.id] = {
          id: category.fields.id,
          sys: category.sys.id,
          title: category.fields.title,
          count: 1
        }
      }
    })
  })

  const [pages, projects] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": "projects", locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' }),
    url.searchParams?.size && content.getEntries<TypeProjectSkeleton>({ content_type: "project", include: 2, locale: { fr: 'fr-CA' }[languageTag()] || 'en-US', ...filter ? { links_to_entry: categories[filter].sys } : {} }),
  ])

  return {
    category: filter && categories[filter],
    categories: Object.values(categories).sort((a, b) => b.count - a.count),
    projects,
    page: pages.items[0]
  }
})