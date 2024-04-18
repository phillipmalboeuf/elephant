<script lang="ts">
  import type { Entry } from 'contentful'
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import { fly } from 'svelte/transition'

  import Logo from './Logo.svelte'
  import Logotype from './Logotype.svelte'
  import Link from './Link.svelte'
  import { enhance } from '$app/forms';

  export let navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let search = false
  let timeout: number
  let form: HTMLFormElement
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
    <button class="button--green" on:click={() => search = !search}>
      {#if search}
      <svg width="19" height="19" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.707107" y1="1.23235" x2="15.3239" y2="15.8491" stroke="currentColor" stroke-width="2"/><line x1="15.7408" y1="1.70711" x2="1.12405" y2="16.3239" stroke="currentColor" stroke-width="2"/></svg>
      {:else}
      <svg width="19" height="19" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.56818" cy="6.56818" r="5.56818" stroke="currentColor" stroke-width="2"/><line x1="11.4775" y1="10.0658" x2="17.6593" y2="15.4749" stroke="currentColor" stroke-width="2"/></svg>
      {/if}
    </button>
  </nav>
  {#if search}
  <form action="/search" bind:this={form} transition:fly={{ y: '-100%', opacity: 1 }} on:input={e => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      form.requestSubmit()
    }, 666)
  }}>
    <input type="text" name="query" autofocus>
  </form>
  {/if}
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

    form {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      padding: ($gap * 4) $gap $gap;
      background-color: $green_dark;
      border-bottom-left-radius: $radius;
      border-bottom-right-radius: $radius;

      input {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid;
        padding: $base;
        font-size: $base * 3;
      }
    }
  }
</style>