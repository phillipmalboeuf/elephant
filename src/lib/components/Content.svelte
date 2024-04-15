<script lang="ts">
  import { isTypeCollection, isTypeRealisations, type TypeCollectionSkeleton, type TypeNavigationSkeleton, type TypeProductSkeleton, type TypeProjectSkeleton, type TypeRealisationsSkeleton } from '$lib/clients/content_types'
  // import { isTypeHero, isTypeList, isTypeText, type TypeArtistSkeleton, type TypeHeroSkeleton, type TypeListSkeleton, type TypeProjectSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Collection from './Collection.svelte'
  import Projects from './Projects.svelte'

  // import Text from './Text.svelte'
  // import Hero from './Hero.svelte'
  // import List from './List.svelte'

  export let content: Entry<TypeNavigationSkeleton | TypeCollectionSkeleton | TypeProductSkeleton | TypeProjectSkeleton | TypeRealisationsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
</script>

{#each content as item, i}
<section>
  {#if isTypeCollection(item)}
  <Collection {item} />
  {:else if isTypeRealisations(item)}
  <Projects {item} />
  {/if}
</section>
{/each}

<style lang="scss">
  section {
    margin: $base;
  }
</style>