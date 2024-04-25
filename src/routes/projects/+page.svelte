<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Filters from '$lib/components/Filters.svelte'
  import Media from '$lib/components/Media.svelte'
  import Collection from '$lib/components/Collection.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  import Projects from '$lib/components/Projects.svelte';
  export let data: PageData
</script>

<header class="flex flex--gapped">
  <hr>
  <h1 class="col col--7of12 col--mobile--12of12">{data.page.fields.title}</h1>
  <p class="col col--7of12 col--mobile--12of12">{data.page.fields.description}</p>
</header>

<nav class="flex flex--tight_gapped" id={data.page.fields.id}>
  {#if data.category}
  <a href="/{data.page.fields.id}#{data.page.fields.id}" class="button">Tous</a>
  {/if}
  {#each data.categories as category}
  <a href="/{data.page.fields.id}?category={category.id}#{data.page.fields.id}" class="button" class:active={data.category && data.category.id === category.id}>{category.title}</a>
  {/each}
</nav>

{#if $page.url.searchParams?.size && data.projects}
<main>
  <Projects item={{
    fields: {
      title: 'Résultats',
      id: 'results',
      projects: data.projects?.items
    }
  }} />
</main>
{:else}
{#if data.page.fields.content?.length}
<Content content={data.page.fields.content} />
{/if}
{/if}

<style lang="scss">
  header {
    padding: $base * 2;

    @media (max-width: $mobile) {
      padding: ($base * 2) $base $base;
    }

    hr {
      width: 100%;
    }
  }

  nav {
    padding: $base ($base * 2);
    margin-bottom: $gap;

    @media (max-width: $mobile) {
      padding: $base $base $base;
    }
  }

  main {
    padding: 0 $base;
  }
</style>