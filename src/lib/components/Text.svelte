<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Link from './Link.svelte'
  import Colors from './Colors.svelte'
  import Parallax from './Parallax.svelte';

  export let index: number
  export let item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<section class="flex flex--gapped" class:alt={!(index % 2)} class:boxed={item.fields.boxed} class:dark={item.fields.dark} class:overflow={item.fields.overflow}>
  {#if item.fields.overflow}

  {#if item.fields.media?.length}
  <figure class="col col--6of12 col--mobile--12of12">
    <Parallax speed={0.1}>
      <Media media={item.fields.media[0]} />
    </Parallax>
  </figure>
  {/if}

  <main class="col col--6of12 col--mobile--12of12 flex flex--gapped">
    <hr>
    {#if item.fields.title}
    <h3>{item.fields.title}</h3>
    {/if}

    <hr>
    {#if item.fields.body}
    <Document body={item.fields.body} />
    {/if}

    {#if item.fields.colors?.length}
    <aside class="flex flex--gapped">
      {#each item.fields.colors as color}
      <Colors item={color} />
      {/each}
    </aside>
    {/if}

    {#if item.fields.buttons}
    <hr>

    <nav class="flex flex--tight_gapped">
      {#each item.fields.buttons as button}
      <Link class="button button--green" link={button} />
      {/each}
    </nav>
    {/if}
  </main>

  {:else}
  <hr class="col col--12of12">
  
  {#if item.fields.title}
  <h3 class="col col--6of12 col--mobile--12of12">{item.fields.title}</h3>
  {/if}

  {#if item.fields.body}
  <main class="col col--6of12 col--mobile--12of12 flex flex--gapped">
    <Document body={item.fields.body} />
  </main>
  {/if}

  {#if item.fields.buttons}
  <nav class="flex flex--tight_gapped">
    {#each item.fields.buttons as button}
    <Link class="button button--green" link={button} />
    {/each}
  </nav>
  {/if}

  {#if item.fields.media?.length}
  <figure class="col col--6of12 col--mobile--12of12">
    <Media media={item.fields.media[0]} />
  </figure>
  {/if}

  {/if}
</section>

{#if item.fields.media?.length > 1}
{#each item.fields.media as media, i}
{#if i > 0}
<figure class="gallery">
  <Media {media} />
</figure>
{/if}
{/each}
{/if}

<style lang="scss">
  section {
    color: $green_darkish;
    margin: ($gap * 3) 0;
    padding: 0 ($gap * 2);

    &.boxed {
      color: $green;
      background-color: $white;
      padding: $base;
      border-radius: $base;

      &.dark {
        color: $white;
        background-color: $green_dark;
      }
    }

    @media (max-width: $mobile) {
      padding: 0;
      margin: ($mobile_gap * 2) 0;
    }

    main {
      flex-direction: column;
    }

    &.overflow {
      align-items: stretch;

      @media (min-width: $mobile) {
        &.alt {
          figure {
            order: 99;
          }
        }
      }

      main {
        font-size: $base;

        hr {
          width: 100%;

          &:not(:first-of-type) {
            margin-top: auto;
          }
        }

        aside {
          
        }
      }

      figure {
        position: relative;
        margin: ($gap * -3) 0;
        padding: 0 $gap;
        z-index: 2;

        @media (max-width: $mobile) {
          padding: 0 $mobile_base;
          margin-top: $mobile_gap * -2.5;
          margin-bottom: $mobile_base * 0.5;
        }
      }
    }
  }

  figure.gallery {
    :global(img),
    :global(video) {
      max-height: 88vh;
    }
  }
</style>