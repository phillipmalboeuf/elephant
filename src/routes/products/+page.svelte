<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Filters from '$lib/components/Filters.svelte'
  import Collection from '$lib/components/Collection.svelte'
  import Search from '$lib/components/Search.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<nav class="flex flex--spaced">
  <div class="col">
    <Filters />
  </div>
  <div class="col col--4of12 col--mobile--12of12">
    <Search />
  </div>
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
    margin: ($base * 2) 0;
    padding: 0 $base;
  }
</style>