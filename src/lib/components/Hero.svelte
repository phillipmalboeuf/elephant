<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Slider from './Slider.svelte';

  export let item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<header class="hero">
  {#if item.fields.media?.length}
  <figure>
    {#if item.fields.media.length === 1}
    <Media media={item.fields.media[0]} eager />
    {:else}
    <Slider buttons={false} autoheight={false}>
      <ol class="slider__container">
        {#each item.fields.media as media}
        <li class="slide">
          <Media {media} />
        </li>
        {/each}
      </ol>
    </Slider>
    {/if}
  </figure>
  {/if}

  <h1>{item.fields.title}</h1>
  {#if item.fields.buttons}
  <nav class="flex flex--tight_gapped">
    {#each item.fields.buttons as button}
    <Link class="button button--green" link={button} />
    {/each}
  </nav>
  {/if}
</header>

<style lang="scss">
  header {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $green;
    border-bottom-right-radius: $radius;
    border-bottom-left-radius: $radius;

    margin: (-$base) (-$base) 0;

    h1 {
      position: relative;
      z-index: 1;
      color: $white;
      font-size: 10vw;
      text-align: center;

      @media (max-width: $mobile) {
        font-size: 8vh;
      }
    }

    nav {
      position: relative;
      z-index: 1;
      justify-content: center;
    }

    figure {
      position: absolute;
      inset: 0;
      z-index: 0;

      ol {
        height: 100vh;
      }

      :global(img),
      .slide {
        border-radius: 0;
        height: 100%;
      }
    }

  }
</style>