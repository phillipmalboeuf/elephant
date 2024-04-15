<script lang="ts">
  import type { Entry } from 'contentful'
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'

  import Logo from './Logo.svelte'
  import Logotype from './Logotype.svelte'
  import Link from './Link.svelte'

  export let navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<header class="flex flex--gapped flex--middle">
  <a href="/" class="logo">
    <Logo />
    <Logotype />
  </a>
  <nav class="flex flex--gapped flex--middle">
    {#each navigation.fields.links as link}
    <Link class="h6" {link} />
    {/each}
    <button class="button--green">
      <svg width="19" height="19" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.56818" cy="6.56818" r="5.56818" stroke="currentColor" stroke-width="2"/><line x1="11.4775" y1="10.0658" x2="17.6593" y2="15.4749" stroke="currentColor" stroke-width="2"/></svg>
    </button>
  </nav>
  <!-- <nav>
    <a href="https://www.facebook.com/ElephantPlay" target="_blank" rel="external">Facebook</a>
    <a href="https://www.instagram.com/elephant.play/" target="_blank" rel="external">Instagram</a>
  </nav>
  <nav>
    <a href="mailto:info@elephantplay.com" target="_blank" rel="external">info@elephantplay.com</a>
    <a href="tel:1 (877) 854-3319" target="_blank" rel="external">1 (877) 854-3319</a>
  </nav> -->
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;

    :global(body:has(.hero:first-child)) & {
      position: fixed;
    }

    padding: ($base * 0.75) $gap;
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;

    color: $white;
    background-color: $green;

    .logo {
      display: flex;
      align-items: flex-end;
      gap: $base;
    }

    nav {
      width: auto;

      a {
        
      }

      button {
        padding: $base * 0.5;
      }

      &:first-of-type {
        margin-left: auto;

        // @media (max-width: $mobile) {
        //   margin-left: 0;
        // }
      }
    }
  }
</style>