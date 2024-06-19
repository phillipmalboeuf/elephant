<script lang="ts">
  import type { Entry } from 'contentful'
  import { languageTag } from '$lib/paraglide/runtime'

  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Slider from '$lib/components/Slider.svelte'
  import CollectionProduct from '$lib/components/CollectionProduct.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
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

  {#if data.project.fields.body}
  <section class="body">
    <Document body={data.project.fields.body} />
  </section>
  {/if}

  {#if data.project.fields.gallery?.length && data.project.fields.gallery?.length > 1}
  <section class="gallery flex flex--gapped">
  {#each data.project.fields.gallery as media, i}
    {#if i > 0}
    <figure class="col {media.fields.file.details.image.width < media.fields.file.details.image.height ? 'col--6of12 col--mobile--12of12' : 'col--12of12'}">
      <Media {media} />
    </figure>
    {/if}
  {/each}
  </section>
  {/if}

  {#if data.project.fields.type || data.project.fields.surface || data.project.fields.height}
  <aside class="flex flex--tight_gapped">
    <hr>
    <div class="col col--5of12 col--mobile--12of12">{languageTag() === 'fr' ? 'Spécifications' : 'Specifications'}</div>

    <table class="col col--7of12 col--mobile--12of12 table--inverse">
      {#if data.project.fields.type}
      <tr>
        <td>{languageTag() === 'fr' ? 'Type d’activité' : 'Activity type'}</td>
        <td>{data.project.fields.type}</td>
      </tr>
      {/if}
      {#if data.project.fields.surface}
      <tr>
        <td>Dimensions</td>
        <td>{data.project.fields.surface}</td>
      </tr>
      {/if}
      {#if data.project.fields.height}
      <tr>
        <td>{languageTag() === 'fr' ? 'Hauteur de chute' : 'Fall height'}</td>
        <td>{data.project.fields.height}</td>
      </tr>
      {/if}
    </table>
  </aside>
  {/if}

  {#if data.project.fields.products?.length}
  <section class="products flex flex--gapped">
    <hr>
    <h3 class="col col--6of12 col--mobile--12of12">Dans ce projet</h3>
    <div class="col col--12of12">
      <Slider disabled={width < 888 ? data.project.fields.products.length === 1 : data.project.fields.products.length < 3} buttons autoheight slidesPerView={width < 888 ? 1 : 3}>
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

  {#if data.project.fields.projects?.length}
  <section class="similar flex flex--gapped">
    <hr>
    <h3 class="col col--6of12 col--mobile--12of12">Projets similaires</h3>
    <div class="col col--12of12">
      <ol class="list--nostyle flex flex--gapped">
        {#each data.project.fields.projects as project (project.fields.id)}
        <li class="col item">
          <a href="/projects/{project.fields.id}">
            <hr>
            <h4>{project.fields.title}</h4>
            {#if project.fields.thumbnail}
            <figure>
              <Media media={project.fields.thumbnail} small />
            </figure>
            {/if}
          </a>
        </li>
        {/each}
      </ol>
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
    // margin: $base 0;
    max-height: 90vh;

    :global(img),
    :global(video) {
      max-height: 90vh;
      object-fit: cover;
    }
  }

  section.gallery {
    padding: 0;
    background-color: transparent;
  }

  section.products {
    position: relative;
    color: $greenish;
    background-color: $white;
  }

  section.similar {
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;

    > hr {
      margin-top: $base * 1.5;
    }

    h3 {
      margin-bottom: $base * 1.5;
    }

    .item {
      flex: 1;

      a {
        position: relative;
        display: block;
        padding: $base;
        color: $white;
        background-color: var(--color, $green);
        min-height: 45vh;
        border-radius: $radius * 0.5;

        hr, h4 {
        }

        hr {
          margin-bottom: $base * 0.5;
        }
      }

      figure {

        :global(img),
        :global(video) {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius: $radius * 0.5;
          opacity: 1;
          transition: opacity 333ms;
        }
      }

      &:hover,
      &:focus {
        figure {
          :global(img),
          :global(video) {
            opacity: 0;
          }
        }
      }
      
    }
  }
</style>