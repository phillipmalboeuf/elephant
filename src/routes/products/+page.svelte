<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Filters from '$lib/components/Filters.svelte'
  import Media from '$lib/components/Media.svelte'
  import Collection from '$lib/components/Collection.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<nav>
  <Filters />
</nav>

{#if $page.url.searchParams?.size}
<main>
  <Collection item={{
    fields: {
      id: 'results',
      title: 'Résultats',
      color: '#ffffff',
      products: data.products?.items
    }
  }} open />
</main>
{:else}
{#if data.page.fields.content?.length}
<Content content={data.page.fields.content} />
{/if}
{/if}

<style lang="scss">
  nav,
  main {
    margin: $gap;
  }
</style>