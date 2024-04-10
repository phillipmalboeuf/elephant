<script lang="ts">
  import type { TypeNavigationLinkSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  export let link: Entry<TypeNavigationLinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  let className: string = undefined
  export { className as class }
</script>

<a class={className} href={link.fields.path} {...link.fields.external && { target: '_blank', rel: 'external' }}>{link.fields.label}</a>