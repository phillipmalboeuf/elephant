<script lang="ts">
  import { isTypeCollection, type TypeCollectionSkeleton, type TypeNavigationSkeleton, type TypeProductSkeleton } from '$lib/clients/content_types'
  // import { isTypeHero, isTypeList, isTypeText, type TypeArtistSkeleton, type TypeHeroSkeleton, type TypeListSkeleton, type TypeProjectSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Collection from './Collection.svelte';

  // import Text from './Text.svelte'
  // import Hero from './Hero.svelte'
  // import List from './List.svelte'

  export let content: Entry<TypeNavigationSkeleton | TypeCollectionSkeleton | TypeProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
</script>

{#each content as item, i}
<section>
  {#if isTypeCollection(item)}
  <Collection {item} />
  {/if}
</section>
{/each}

<style lang="scss">
  section {
    margin: $base;
  }
</style>