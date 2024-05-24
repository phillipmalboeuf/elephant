
import { isTypeCollection, type TypeNavigationSkeleton, type TypePageSkeleton } from '$lib/clients/content_types.js'
import { content } from '$lib/clients/contentful'

export const load = async ({ request }) => {

  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": "products" }),
  ])

  console.log(pages.items[0].fields.content?.filter(isTypeCollection))

  return {
    collections: pages.items[0].fields.content?.filter(isTypeCollection)
  }
}