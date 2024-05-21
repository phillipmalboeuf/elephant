<script lang="ts">
  import { page } from '$app/stores'
  import Collection from '$lib/components/Collection.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  export let data: PageData

  let timeout: NodeJS.Timeout
  let form: HTMLFormElement
</script>

<nav class="flex flex--spaced">
  <div class="col col--4of12 col--mobile--12of12"></div>
  <form class="col col--4of12 col--mobile--12of12 flex flex--tight_gapped" action="/search" bind:this={form} on:input={e => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      form.requestSubmit()
    }, 666)
  }}>
    <fieldset>
      <label for="query">Nom du produit ou #</label>
      <input type="text" name="query" id="query" value={$page.url.searchParams.get("query")} autofocus={!!$page.url.searchParams.get("query")} placeholder=" ">
    </fieldset>
    <button class="button--green" type="submit">Recherche</button>
  </form>
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

    fieldset {
      width: auto;
      flex: 1;
    }
  }
</style>