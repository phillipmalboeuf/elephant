<script lang="ts">
  import { isTypeCollection, isTypeHero, isTypeNavigation, isTypeRealisations, isTypeText, type TypeCollectionSkeleton, type TypeHeroSkeleton, type TypeNavigationSkeleton, type TypeProductSkeleton, type TypeProjectSkeleton, type TypeRealisationsSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Collection from './Collection.svelte'
  import Projects from './Projects.svelte'

  import Text from './Text.svelte'
  import Hero from './Hero.svelte'
  import Navigation from './Navigation.svelte'
  // import List from './List.svelte'

  export let content: Entry<TypeCollectionSkeleton | TypeHeroSkeleton | TypeNavigationSkeleton | TypeProductSkeleton | TypeProjectSkeleton | TypeRealisationsSkeleton | TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
</script>

{#each content as item, i}
<section>
  {#if isTypeCollection(item)}
  <Collection {item} />
  {:else if isTypeRealisations(item)}
  <Projects {item} />
  {:else if isTypeNavigation(item)}
  <Navigation {item} />
  {:else if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeText(item)}
  <Text {item} />
  {/if}
</section>
{/each}

<style lang="scss">
  section {
    margin: $base;
  }
</style>