<script lang="ts">
  import type { Entry } from 'contentful'

  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Slider from '$lib/components/Slider.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  import CollectionProduct from '$lib/components/CollectionProduct.svelte';
  export let data: PageData

  let width: number
</script>

<svelte:window bind:innerWidth={width} />

<svelte:head>
	<title>{data.project.fields.title} – Elephant Play</title>
	<meta name="description" content="{data.project.fields.description}" />
</svelte:head>


<main>
  <header class="flex flex--gapped">
    <hr>

    <h1 class="h3 col col--7of12 col--mobile--12of12">{data.project.fields.title}</h1>

    <hr>
    <div class="col col--3of12 col--mobile--6of12">{data.project.fields.location}</div>
    <div class="col col--3of12 col--mobile--6of12">{data.project.fields.year}</div>
    <div class="col col--6of12 col--mobile--12of12"><p>{data.project.fields.description}</p></div>
  </header>

  {#if data.project.fields.gallery?.length}
  <figure>
    <Media media={data.project.fields.gallery[0]} />
  </figure>
  {/if}

  <section class="body">
    <Document body={data.project.fields.body} />
  </section>

  {#if data.project.fields.gallery?.length && data.project.fields.gallery?.length > 1}
  {#each data.project.fields.gallery as media, i}
  {#if i > 0}
  <figure>
    <Media {media} />
  </figure>
  {/if}
  {/each}
  {/if}

  <aside class="flex flex--tight_gapped">
    <hr>
    <div class="col col--5of12 col--mobile--12of12">Spécifications</div>

    <table class="col col--7of12 col--mobile--12of12 table--inverse">
      <tr>
        <td>Type d’activité</td>
        <td>{data.project.fields.type}</td>
      </tr>
      <tr>
        <td>Taille</td>
        <td>{data.project.fields.surface}</td>
      </tr>
      <tr>
        <td>Hauteur de chute</td>
        <td>{data.project.fields.height}</td>
      </tr>
    </table>
  </aside>

  {#if data.project.fields.products?.length}
  <section class="products flex flex--gapped">
    <hr>
    <h3 class="col col--6of12 col--mobile--12of12">Dans ce projet</h3>
    <div class="col col--12of12">
      <Slider buttons autoheight slidesPerView={width < 888 ? 1 : 3}>
        <ol class="slider__container">
          {#each data.project.fields.products as product}
          <li class="slide">
            <CollectionProduct {product} />
          </li>
          {/each}
        </ol>
      </Slider>
    </div>
  </section>
  {/if}
</main>


<style lang="scss">
  main {
    padding: ($base * 2) ($base * 4);

    @media (max-width: $mobile) {
      padding: ($base);
    }
  }

  header,
  section,
  aside {
    padding: $base;
    background-color: $green_darkish;
    border-radius: $radius * 0.5;

    margin: $base 0;

    hr {
      width: 100%;
    }
  }

  header {
    h1 {
      margin-bottom: 10vh;
    }
  }

  .body {
    @media (min-width: $mobile) {
      columns: 2;
      column-gap: $base;
    }

    :global(*) {
      margin-bottom: $base * 0.666;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  figure {
    margin: $base 0;
  }

  .products {
    position: relative;
    color: $greenish;
    background-color: $white;
  }
</style>