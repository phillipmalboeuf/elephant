<script lang="ts">
  import Media from '$lib/components/Media.svelte'
  import Slider from '$lib/components/Slider.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<main>
  {#if data.page.fields.gallerie?.length}
  <figure>
    <Slider buttons={false} autoheight={false}>
      <ol class="slider__container">
        {#each data.page.fields.gallerie as media}
        <li class="slide">
          <Media {media} />
        </li>
        {/each}
      </ol>
    </Slider>
  </figure>
  {:else if data.page.fields.image}
  <figure>
    <Media media={data.page.fields.image} />
  </figure>
  {/if}
  <h1>{data.page.fields.title}</h1>
  
  {#if data.page.fields.link}
  <a class="button" href={data.page.fields.link.fields.path} target="_blank" rel="external">{data.page.fields.link.fields.label}</a>
  {/if}
</main>

<style lang="scss">
  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

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

    > a {
      position: fixed;
      bottom: $gap;
      right: $gap;

      @media (max-width: $mobile) {
        bottom: $gap * 5;
        right: 50%;
        transform: translateX(50%);
      }
    }
  }
</style>