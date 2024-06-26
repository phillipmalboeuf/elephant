<script lang="ts">
  import type { TypeCollectionFields, TypeCollectionSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import Slider from './Slider.svelte'
  import CollectionProduct from './CollectionProduct.svelte'
  import { languageTag } from '$lib/paraglide/runtime'

  export let item: Entry<TypeCollectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> | { fields: Entry<TypeCollectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">['fields'] }
  export let open = undefined

  let width: number = 2000
</script>

<svelte:window bind:innerWidth={width} />

<details id={item.fields.id} {open} style:--color={item.fields.color} class:white={item.fields.color?.toLowerCase() === '#ffffff'}>
  <summary class="flex flex--gapped flex--spaced">
    <hr>
    <h3>{item.fields.title}</h3>
    {#if !open}
    {#if item.fields.id === "products"}
    <a href="/products" class="button button--green">{languageTag() === 'fr' ? 'Voir tous les produits' : 'See all products'}</a>
    {:else}
    <button class="button--none"><span class={languageTag()}>{item.fields.title}</span> <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L8.5 8L16 1" stroke="currentColor"/></svg></button>
    {/if}
    {/if}

    <figure>
      {#if item.fields.products?.length}
      {#if width > 888}
      <ol class="list--nostyle flex flex--gapped slider__container">
        {#each item.fields.products as product, i}
        {#if i < 3}
        <li class:col={width > 888} class="col--4of12 col--mobile--12of12 slide">
          <CollectionProduct collection={item} {product} />
        </li>
        {/if}
        {/each}
      </ol>
      {:else}
      <Slider buttons autoplay={false} autoheight={false}>
        <ol class="list--nostyle flex--gapped slider__container">
          {#each item.fields.products as product, i}
          {#if i < 3}
          <li class:col={width > 888} class="col--4of12 col--mobile--12of12 slide">
            <CollectionProduct collection={item} {product} />
          </li>
          {/if}
          {/each}
        </ol>
      </Slider>
      {/if}
      {/if}
    </figure>
  </summary>

  <main class="flex flex--gapped">
    {#if item.fields.description}
    <hr>
    <p class="col col--6of12 col--mobile--12of12">{languageTag() === 'fr' ? 'À propos de cette série' : 'About this series'}</p>
    <p class="col col--6of12 col--mobile--12of12">{item.fields.description}</p>
    <hr>
    {/if}

    {#if item.fields.products?.length}
    <ol class="list--nostyle flex flex--gapped">
      {#each item.fields.products as product, i}
      <li class="col col--4of12 col--mobile--12of12">
        <CollectionProduct collection={item} {product} />
      </li>
      {/each}
    </ol>
    {:else}
    <em>Aucun résults de produits</em>
    {/if}
  </main>
</details>

<style lang="scss">
  details {
    color: $white;
    background-color: var(--color, $green);
    padding: $base;
    border-radius: $radius * 0.66;

    &.white {
      color: $green;

      li {
        color: $black;
      }
    }

    summary {
      cursor: pointer;

      button {
        pointer-events: none;

        span:before {
          content: "See all from ";
        }

        span.fr:before {
          content: "Afficher tous les produits de ";
        }

        @media (max-width: $mobile) {
          order: 99;
          margin: $base auto 0;
        }
      }

      a.button--green {
        @media (max-width: $mobile) {
          order: 99;
          margin: 0 auto;
        }
      }

      > figure {
        position: relative;
        width: 100%;

        :global(nav) {
          top: calc(50% - $base);
          left: -$base * 0.5;
          right: -$base * 0.5;

          :global(button) {
            // color: currentColor;
            // background-color: transparent;
          }
        }
      }
    }

    main {
      margin-top: $gap * 3;

      p {
        
      }
    }

    &[open] {
      summary ol,
      summary :global(nav) {
        display: none;
      }

      ol {
        margin: ($gap * 2) 0;
        row-gap: $gap * 2;
      }

      summary button {
        @media (max-width: $mobile) {
          margin: 0;
        }

        span:before {
          content: "See less from ";
        }

        span.fr:before {
          content: "Voir l'aperçu de ";
        }

        svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  hr {
    width: 100%;
    margin: 0;
  }

  h3 {
    
  }
</style>