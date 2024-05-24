<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Filters from '$lib/components/Filters.svelte'
  import Collection from '$lib/components/Collection.svelte'
  import Search from '$lib/components/Search.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  export let data: PageData
</script>

<svelte:head>
	<title>{data.collection.fields.title} – Elephant Play</title>
	<meta name="description" content="{data.collection.fields.description}" />
</svelte:head>

<nav class="flex flex--gapped flex--spaced">
  <div class="col col--8of12 col--mobile--12of12">
    <Filters />
  </div>
  <div class="col col--4of12 col--mobile--12of12">
    <Search />
  </div>
</nav>

<main>
  <Collection item={data.collection} open />
</main>

<style lang="scss">
  main,
  nav {
    margin: ($base * 2) 0;
    padding: 0 $base;
  }
</style>