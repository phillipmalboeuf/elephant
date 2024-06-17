<script lang="ts">
  import type { Entry } from 'contentful'
  import { languageTag } from '$lib/paraglide/runtime'
  import type { TypeModelSkeleton } from '$lib/clients/content_types'
  import { type EmblaCarouselType } from 'embla-carousel'

  import Media from '$lib/components/Media.svelte'
  import Slider from '$lib/components/Slider.svelte'
  
  import { downloads } from '$lib/stores'
  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  import { feet } from '$lib/formatters';
  export let data: PageData

  let model: Entry<TypeModelSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  let slider: EmblaCarouselType

  const locale = languageTag()

  const types = {
    "Lancer": locale === 'fr' ? "Lancer" : "Throw",
    "Glisser": locale === 'fr' ? "Glisser" : "Slide",
    "Socialiser": locale === 'fr' ? "Socialiser" : "Socialize",
    "Jeux cognitif": locale === 'fr' ? "Jeux cognitif" : "Pretend play",
    "Sauter": locale === 'fr' ? "Sauter" : "Jump",
    "Courir": locale === 'fr' ? "Courir" : "Run",
    "Se suspendre": locale === 'fr' ? "Se suspendre" : "Hang",
    "Coordination": locale === 'fr' ? "Coordination" : "Coordination",
    "Balancer": locale === 'fr' ? "Balancer" : "Swing",
    "Rebondir": locale === 'fr' ? "Rebondir" : "Bounce",
    "Équilibre": locale === 'fr' ? "Équilibre" : "Balance",
    "Grimper": locale === 'fr' ? "Grimper" : "Climb",
    "Tourner": locale === 'fr' ? "Tourner" : "Rotating",
  }


  $: {
    model = data.product.fields.models?.length
      ? $page.url.searchParams.has('model') ? data.product.fields.models.find(model => model.fields.id === $page.url.searchParams.get('model')) : data.product.fields.models[0]
      : undefined
  }
</script>

<svelte:head>
	<title>{data.product.fields.title} – Elephant Play</title>
	<!-- <meta name="description" content="{data.product.fields.description}" /> -->
</svelte:head>

<nav class="flex flex--tight_gapped">
  {#if data.collection}
  <a href="/collections/{data.collection.fields.id}" class="button button--green"><svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1 8.5L8 16" stroke="currentColor"/></svg> {languageTag() === 'fr' ? 'Retour à' : 'Return to'} {data.collection.fields.title}</a>
  {/if}
  <a href="/products" class="button button--green"><svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L1 8.5L8 16" stroke="currentColor"/></svg> {languageTag() === 'fr' ? 'Produits' : 'Products'}</a>
</nav>

<article class="flex flex--gapped" style:--color={data.collection?.fields.color} class:light={['#fff', '#ffffff'].includes(data.collection?.fields.color)}>
  <header class="flex flex--start flex--gapped col col--4of12 col--mobile--12of12">
    <hr class="col col--12of12">
    <h1 class="h3 col col--12of12">{data.product.fields.title}</h1>
    <table class="table--tight col col--4of12">
      <tr>
        <td class="td--bordered sku">{data.product.fields.sku}</td>
      </tr>
    </table>
    <table class="table--tight col col--8of12" style:--length={2}>
      <tr>
        <td>{languageTag() === 'fr' ? 'Type d’activité' : 'Activity type'}</td>
        <td>{data.product.fields.types?.map(t => types[t] || t).join(', ')}</td>
      </tr>
      <tr>
        <td>{languageTag() === 'fr' ? 'Âge' : 'Age'}</td>
        <td>{data.product.fields.ageMin}-{data.product.fields.ageMax}</td>
      </tr>
    </table>

    {#if data.product.fields.models?.length}
    <main class="col col--12of12">
      <p>{languageTag() === 'fr' ? 'Modèle' : 'Model'}</p>
      {#each data.product.fields.models as model, i}
      <a href="?model={model.fields.id}" class="button" class:active={$page.url.searchParams.get('model') === model.fields.id}><em>{model.fields.title}</em> <small>{model.fields.sku}</small></a>
      {/each}
    </main>
    {/if}

    {#if model}
    <table class="table--tight col col--12of12">
      <tr>
        <th>{languageTag() === 'fr' ? 'Spécifications' : 'Specifications'}</th>
      </tr>
      <tr>
        <td>{languageTag() === 'fr' ? 'Capacité' : 'Capacity'}</td>
        <td>{model.fields.capacity}</td>
      </tr>
      <tr>
        <!-- <td>Taille</td> -->
        <td>{languageTag() === 'fr' ? 'Aire de protection' : 'Use zone'}</td>
        <td>{feet(languageTag() === 'en-US' ? (model.fields.surfaceXASTM || model.fields.surfaceX) : model.fields.surfaceX)} x {feet(languageTag() === 'en-US' ? (model.fields.surfaceYASTM || model.fields.surfaceY) : model.fields.surfaceY)}</td>
      </tr>
      <tr>
        <td>{languageTag() === 'fr' ? 'Hauteur de chute' : 'Fall height'}</td>
        <td>{feet(model.fields.height)}</td>
      </tr>
      <!-- <tr>
        <td>Zone de sécurité</td>
        <td>{model.fields.security}</td>
      </tr> -->
    </table>

    {#if model.fields.downloads?.length}
    <main class="col col--12of12">
      <p>Downloads</p>
      <aside>
      {#each model.fields.downloads as download, i}
      <a href={download.fields.file.url} download on:click|preventDefault={() => {
        downloads.set([...$downloads, download])
      }}>{download.fields.title} <small>+</small></a>
      {/each}
      </aside>
    </main>
    {/if}
    {/if}
  </header>
  <section class="col col--8of12 col--mobile--12of12 flex flex--gapped">
    {#if model && model.fields.gallery?.length}
    <figure>
      {#key model.fields.id}
      <Slider buttons autoheight bind:slider={slider}>
        <ol class="slider__container">
          {#each model.fields.gallery as media}
          <li class="slide">
            <Media {media} />
          </li>
          {/each}
        </ol>
      </Slider>
      {/key}
    </figure>

    <div class="flex flex--gapped buttons">
      {#each model.fields.gallery as media, i}
      <button on:click={() => slider.scrollTo(i)}>
        <Media {media} small ar={0.66} />
      </button>
      {/each}
    </div>

    {#if data.product.fields.gallery?.length}
    <a href="#gallery" class="button button--green col col--12of12">Voir toute la galerie <svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L11.5 11L22 1" stroke="currentColor" stroke-width="2"/></svg></a>
    {/if}
    {/if}

    {#if data.product.fields.gallery?.length}
    <ul class="list--nostyle flex flex--gapped" id="gallery">
    {#each data.product.fields.gallery as media}
     <li><Media {media} /></li>
    {/each}
    </ul>
    {/if}
  </section>
</article>




<style lang="scss">
  nav {
    padding: $base $base 0;
  }

  article {
    padding: $base;

    header {
      @media (min-width: $mobile) {
        position: sticky;
        top: $gap * 3.5;

        max-height: calc(100vh - ($gap * 7));
        overflow-y: auto;
      }

      padding: $base;
      border-radius: $radius * 0.5;

      color: $white;
      background-color: var(--color, $green);

      h1 {
        margin-bottom: $gap * 3;
      }

      table {
        font-size: $base * 0.75;

        .sku {
          font-size: $base * 1.25;
        }
      }
    }

    &.light header {
      color: $black;
    }

    main {
      display: flex;
      flex-direction: column;
      gap: $base * 0.25;

      &:first-of-type {
        margin: $base 0;
      }

      .button {
        justify-content: space-between;

        em {
          font-style: normal;
          font-size: $base * 0.85;
        }

        &:not(:hover):not(:focus):not(.active) {
          color: $white;
          background-color: fade-out($black, 0.75);
        }
      }
    }

    aside {
      padding: $base;
      border-radius: $radius * 0.5;
      background-color: fade-out($black, 0.75);

      a {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid fade-out($white, 0.75);
        padding-bottom: 2px;
        margin-bottom: $base * 0.25;

        &:hover,
        &:focus {
          border-color: currentColor;
        }
      }
    }

    figure {
      width: 100%;
      // min-height: 50vh;
      position: relative;
      background-color: $white;
      border-radius: $radius;
    }

    .buttons {
      flex-wrap: nowrap;
      button {
        padding: $base * 0.25;
        flex: 1;
        max-width: 33%;
      }
    }

    section {
      .button.col {
        justify-content: space-between;
      }
    }
  }
</style>