<script lang="ts">
  import Media from '$lib/components/Media.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  export let data: PageData
</script>

<svelte:head>
	<title>{data.product.fields.title} – Elephant Play</title>
	<!-- <meta name="description" content="{data.product.fields.description}" /> -->
</svelte:head>

<nav class="flex flex--tight_gapped">
  {#if data.collection}
  <a href="/collections/{data.collection.fields.id}" class="button button--green"><svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1 8.5L8 16" stroke="currentColor"/></svg> Retour à {data.collection.fields.title}</a>
  {/if}
  <a href="/products" class="button button--green"><svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1 8.5L8 16" stroke="currentColor"/></svg> Produits</a>
</nav>

<article class="flex flex--gapped" style:--color={data.collection?.fields.color}>
  <header class="flex flex--start flex--gapped col col--4of12">
    <hr class="col col--12of12">
    <h1 class="h3 col col--12of12">{data.product.fields.title}</h1>
    <table class="col col--6of12">
      <tr>
        <td>{data.product.fields.sku}</td>
      </tr>
    </table>
    <table class="col col--6of12">
      <tr>
        <td>Type d’activité</td>
        <td>{data.product.fields.type}</td>
      </tr>
      <tr>
        <td>Âge</td>
        <td>{data.product.fields.ageMin}-{data.product.fields.ageMax}</td>
      </tr>
    </table>
    <table class="col col--12of12">
      <tr>
        <th>Spécifications</th>
      </tr>
      <tr>
        <td>Type d’activité</td>
        <td>{data.product.fields.type}</td>
      </tr>
      <tr>
        <td>Âge</td>
        <td>{data.product.fields.ageMin}-{data.product.fields.ageMax}</td>
      </tr>
    </table>
  </header>
  <figure class="col col--8of12 flex flex--gapped">
    {#if data.product.fields.gallery?.length}
    <ul class="list--nostyle flex flex--gapped">
    {#each data.product.fields.gallery as media}
     <li><Media {media} /></li>
    {/each}
    </ul>
    {/if}
  </figure>
</article>




<style lang="scss">
  nav {
    padding: $base $base 0;
  }

  article {
    padding: $base;

    header {
      position: sticky;
      top: $gap * 3.5;
      padding: $base;
      border-radius: $radius * 0.5;

      color: $white;
      background-color: var(--color, $green);

      h1 {
        text-transform: uppercase;
        margin-bottom: $gap * 3;
      }
    }
  }
</style>