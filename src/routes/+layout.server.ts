
import type { TypeNavigationSkeleton } from '$lib/clients/content_types.js'
import { content } from '$lib/clients/contentful'
// import UAParser from 'ua-parser-js'

export const load = async ({ request }) => {
  // let parser: UAParser = request.headers.has('User-Agent') && new UAParser(request.headers.get('User-Agent'))

  const [social, contact] = await Promise.all([
    // content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.links'], include: 2, "fields.id": "header", locale: { 'fr': 'fr-CA' }[PUBLIC_VITE_LOCALE] || 'en-CA' }),
    // content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.links'], include: 2, "fields.id": "footer", locale: { 'fr': 'fr-CA' }[PUBLIC_VITE_LOCALE] || 'en-CA' }),
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.links'], include: 2, "fields.id": "social", locale: 'en-US' }),
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.links'], include: 2, "fields.id": "contact", locale: 'en-US' }),
  ])

  return {
    // header: header.items[0],
    // footer: footer.items[0],
    social: social.items[0],
    contact: contact.items[0],
    // device: parser?.getDevice().type || 'desktop'
  }
}