<script lang="ts">
  import type { TypeHeroSkeleton, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Link from './Link.svelte'

  export let item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<section class="flex flex--gapped">
  <hr>
  {#if item.fields.media}
  <figure></figure>
  {/if}

  <h3 class="col col--6of12">{item.fields.title}</h3>

  {#if item.fields.body}
  <main class="col col--6of12 flex flex--gapped">
    <Document body={item.fields.body} />
  </main>
  {/if}

  {#if item.fields.buttons}
  <nav>
    {#each item.fields.buttons as button}
    <Link class="button button--green" link={button} />
    {/each}
  </nav>
  {/if}
</section>

<style lang="scss">
  section {
    color: $green_darkish;
    margin: ($gap) 0 ($gap * 4);

    hr {
      width: 100%;
    }

    main {
      flex-direction: column;
    }
  }
</style>