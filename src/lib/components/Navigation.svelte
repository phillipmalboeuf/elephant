<script lang="ts">
  import type { TypeHeroSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  export let item: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<nav class="flex flex--gapped">
  {#each item.fields.links as link}
  <a class="col col--6of12 col--mobile--12of12" href={link.fields.path} style:--color={link.fields.color}>
    <hr>
    <h4>{link.fields.label}</h4>
  </a>
  {/each}
</nav>

<style lang="scss">
  nav {
    a {
      padding: $base;
      color: $white;
      background-color: var(--color, $green);
      min-height: 45vh;
      border-radius: $radius * 0.5;

      @media (max-width: $mobile) {
        min-height: 33vh;

        h4 {
          font-size: $base * 1.5;
        }
      }

      hr {
        margin-bottom: $base * 0.5;
      }
    }
  }
</style>