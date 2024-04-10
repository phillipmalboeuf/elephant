<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Filters from '$lib/components/Filters.svelte'
  import Collection from '$lib/components/Collection.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  export let data: PageData
</script>

<svelte:head>
	<title>{data.collection.fields.title} – Elephant Play</title>
	<meta name="description" content="{data.collection.fields.description}" />
</svelte:head>

<nav>
  <Filters />
</nav>

<main>
  <Collection item={data.collection} open />
</main>

<style lang="scss">
  main,
  nav {
    padding: $base;
  }
</style>