import type { TypeCollectionSkeleton, TypePageSkeleton, TypeProductSkeleton, TypeProjectSkeleton, TypeRepSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { email } from '$lib/clients/postmark.js'
import { languageTag } from '$lib/paraglide/runtime.js'
import type { Entry } from 'contentful'
// import { type Actions } from './$types'

export const load = (async ({ locals, url, params }) => {

  const [page, reps] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": params.page, limit: 1, locale: { fr: 'fr-CA' }[languageTag()] || 'en-US' }),
    (params.page === 'contact' && url.searchParams.has('search')) ? content.getEntries<TypeRepSkeleton>({ content_type: "rep", include: 2, "query": url.searchParams.get('search'), limit: 10 }) : undefined
  ])

  return {
    page: page.items[0],
    reps,
  }
})

export const actions = {
	contact: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    return await email.sendEmailWithTemplate({
        From: 'phil@phils.computer',
        To: 'info@elephantplay.com',
        MessageStream: 'broadcast',
        ReplyTo: data.email as string,
        TemplateAlias: 'base',
        TemplateModel: {
          subject: data.subject as string,
          body: JSON.stringify(data, null, 2),
          product_url: "https://elephantplay.com",
          product_name: "https://elephantplay.com",
          company_name: "Elephant Play",
          company_address: "Elephant Play"
        }
      })
	},
}
