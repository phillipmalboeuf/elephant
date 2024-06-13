<script lang="ts">
  import { page } from '$app/stores'
  import Collection from '$lib/components/Collection.svelte'
  import Search from '$lib/components/Search.svelte'
  import { languageTag } from '$lib/paraglide/runtime'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<nav class="flex flex--gapped flex--spaced">
  <div class="col">
    <a href="/products" class="button button--green"><svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1 8.5L8 16" stroke="currentColor"/></svg> {languageTag() === 'fr' ? 'Produits' : 'Products'}</a>
  </div>
  <div class="col col--4of12 col--mobile--12of12">
    <Search />
  </div>
</nav>

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

<style lang="scss">
  nav,
  main {
    margin: ($base * 2) 0;
    padding: 0 $base;
  }
</style>