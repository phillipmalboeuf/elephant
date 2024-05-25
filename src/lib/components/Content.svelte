<script lang="ts">
  import { isTypeCollection, isTypeForm, isTypeHero, isTypeNavigation, isTypeRealisations, isTypeReps, isTypeText, type TypeCollectionSkeleton, type TypeFormSkeleton, type TypeHeroSkeleton, type TypeNavigationSkeleton, type TypeProductSkeleton, type TypeProjectSkeleton, type TypeRealisationsSkeleton, type TypeRepsSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import Collection from './Collection.svelte'
  import Projects from './Projects.svelte'

  import Text from './Text.svelte'
  import Hero from './Hero.svelte'
  import Navigation from './Navigation.svelte'
  import Form from './Form.svelte'
  import Reps from './Reps.svelte'
  // import List from './List.svelte'

  export let content: Entry<TypeCollectionSkeleton | TypeFormSkeleton | TypeHeroSkeleton | TypeNavigationSkeleton | TypeProductSkeleton | TypeProjectSkeleton | TypeRealisationsSkeleton | TypeRepsSkeleton | TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
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
  <Text {item} index={i} />
  {:else if isTypeForm(item)}
  <Form {item} />
  {:else if isTypeReps(item)}
  <Reps {item} />
  {/if}
</section>
{/each}

<style lang="scss">
  section {
    margin: $base;
  }
</style>