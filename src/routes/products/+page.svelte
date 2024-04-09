<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

{#if data.page.fields.content?.length}
<Content content={data.page.fields.content} />
{/if}