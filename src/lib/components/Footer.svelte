<script lang="ts">
  import type { Entry } from 'contentful'
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'

  import Logo from './Logo.svelte'
  import Logotype from './Logotype.svelte'
  import Link from './Link.svelte'

  import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime.js"
	import { i18n } from '$lib/i18n.js'
	import { page } from '$app/stores'

  export let primary: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let social: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let contact: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let x: number = 0
</script>

<svelte:body on:pointermove={e => {
  x = e.x
}} />

<footer class="flex flex--gapped">
  <nav class="col col--12of12">
    <a href="/" class="logo">
      <Logotype />
    </a>
  </nav>
  <nav class="col col--3of12 col--mobile--12of12 flex flex--tight_gapped">
    <a href={i18n.route($page.url.pathname)}
      data-sveltekit-reload
      hreflang={'fr'}
      aria-current={languageTag() === 'fr' ? "page" : undefined} class="button">Français</a>
    <a href={i18n.route($page.url.pathname)}
      data-sveltekit-reload
      hreflang={'en'}
      aria-current={languageTag().startsWith('en') ? "page" : undefined} class="button">English</a>
    <a href={i18n.route($page.url.pathname)}
      data-sveltekit-reload
      hreflang={'en-US'}
      aria-current={languageTag() === 'en-US' ? "page" : undefined} class="button">US</a>
  </nav>
  <nav class="col col--2of12 col--mobile--6of12">
    {#each social.fields.links as link}
    <Link {link} /><br>
    {/each}
    <br>
    {#each contact.fields.links as link}
    <Link {link} /><br>
    {/each}
  </nav>
  <nav class="col col--2of12 col--mobile--6of12">
    {#each primary.fields.links as link}
    <Link {link} /><br>
    {/each}
  </nav>

  <figure class="col col--12of12 elephant" style:--x={x}>
    <Logo />
  </figure>

  <hr>
  <p>© 2024 ElephantPlay.com {languageTag() === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
</footer>

<style lang="scss">
  footer {
    padding: $gap $gap;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;

    color: $white;
    background-color: $green;

    .logo {
      display: flex;
      align-items: flex-end;
      gap: $base;
    }

    hr {
      width: 100%;
    }

    nav {
      @media (max-width: $mobile) {
        margin: ($base * 0.5) 0;
      }

      a[hreflang] {
        &:not([aria-current="page"]) {
          opacity: 0.75;

          &:hover,
          &:focus {
            opacity: 1;
          }
        }
      }
    }

    .elephant {
      @media (min-width: $mobile) {
        margin-bottom: -$gap;

        :global(svg) {
          width: 10vw;
          height: 10vw;
          transform: translateX(calc((var(--x) * 1px) - 5vw));
        }
      }

      @media (max-width: $mobile) {
        // margin-top: -$gap;
      
        :global(svg) {
          width: 33vw;
          height: 33vw;
        }
      }
    }
  }
</style>