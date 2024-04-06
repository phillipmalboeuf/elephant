<script lang="ts">
  import Media from '$lib/components/Media.svelte';
  import type { PageData } from './$types'
  export let data: PageData
</script>

<main>
  {#if data.page.fields.image}
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
      color: $white;
      text-transform: uppercase;
      font-size: 10vw;
    }

    figure {
      position: absolute;
      inset: 0;
      z-index: -1;

      :global(img) {
        border-radius: 0;
        height: 100%;
      }
    }

    > a {
      position: fixed;
      bottom: $gap;
      right: $gap;
      font-size: $base * 0.75;
    }
  }
</style>