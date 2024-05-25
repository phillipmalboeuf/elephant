<script lang="ts">
  import type { TypeHeroSkeleton, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Link from './Link.svelte'

  export let index: number
  export let item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<section class="flex flex--gapped" class:alt={!(index % 2)} class:boxed={item.fields.boxed} class:dark={item.fields.dark} class:overflow={item.fields.overflow}>
  {#if item.fields.overflow}

  {#if item.fields.media?.length}
  <figure class="col col--6of12 col--mobile--12of12">
    <Media media={item.fields.media[0]} />
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
      <div class="flex flex--tight_gapped">
        <h6><small>{color.fields.title}</small>{#if color.fields.subtitle}<small>{color.fields.subtitle}</small>{/if}</h6>
        <hr>
        <ul class="list--nostyle flex flex--tight_gapped">
          {#each color.fields.colors as c}
          <li style:--color={c} class:white={c.toLowerCase().startsWith('#fff')}></li>
          {/each}
        </ul>
      </div>
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
          div {
            @media (min-width: $mobile) {
              flex: 1;
            }
          }

          h6 {
            text-transform: none;
            width: 100%;
            display: flex;
            justify-content: space-between;
          }

          hr {
            margin-bottom: $base * 0.25;
          }

          ul {
            li {
              width: $base * 2;
              height: $base * 2;
              border-radius: 50%;
              background-color: var(--color, $black);
              border: 1.5px solid transparent;

              &.white {
                border-color: $grey;
              }
            }
          }
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