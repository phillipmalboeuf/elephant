<script lang="ts">
  import type { Entry } from 'contentful'
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import { fly } from 'svelte/transition'

  import Logo from './Logo.svelte'
  import Logotype from './Logotype.svelte'
  import Link from './Link.svelte'
  import { page } from '$app/stores'
  import { afterNavigate } from '$app/navigation'

  export let navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let menu = false
  let search = false
  let timeout: NodeJS.Timeout
  let form: HTMLFormElement
  let input: HTMLInputElement

  let width: number = 0

  afterNavigate(() => {
    menu = false
  })
</script>

<svelte:window bind:innerWidth={width} />

<header class="flex flex--gapped flex--middle" class:menu class:search>
  <a href="/" class="logo">
    <Logo />
    <Logotype />
  </a>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <nav class="flex flex--gapped flex--middle">
    {#each navigation.fields.links as link}
    <Link class="h5 {$page.url.pathname.startsWith(link.fields.path) ? "current" : ""}" {link} />
    {/each}
    <button class="button--green search" on:click={() => {
      if (width > 888) { 
        search = !search
        search && input.focus()
      } else {
        form.requestSubmit()
        menu = false
      }
    }}>
      {#if search}
      <svg width="19" height="19" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.707107" y1="1.23235" x2="15.3239" y2="15.8491" stroke="currentColor" stroke-width="2"/><line x1="15.7408" y1="1.70711" x2="1.12405" y2="16.3239" stroke="currentColor" stroke-width="2"/></svg>
      {:else}
      <svg width="19" height="19" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.56818" cy="6.56818" r="5.56818" stroke="currentColor" stroke-width="2"/><line x1="11.4775" y1="10.0658" x2="17.6593" y2="15.4749" stroke="currentColor" stroke-width="2"/></svg>
      {/if}
    </button>

    <form action="/search" bind:this={form} on:input={e => {
      if (width > 888) { 
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          form.requestSubmit()
        }, 666)
      }
    }}>
      <input type="text" name="query" bind:this={input} on:click|stopPropagation>
    </form>
  </nav>

  <button class="h4 menu" class:button--none={!menu} class:button--green={menu} on:click={() => menu = !menu}>{#if !menu}Menu{:else}<svg width="18" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.699294" y1="1.23247" x2="15.316" y2="15.8492" stroke="currentColor" stroke-width="2"/><line x1="15.7384" y1="1.70711" x2="1.12161" y2="16.3239" stroke="currentColor" stroke-width="2"/></svg>{/if}</button>
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

      :global(a.h5) {
        font-size: $base;

        &:hover,
        &:focus {
          position: relative;
          
          &:before {
            content: "";
            position: absolute;
            top: -6px;
            left: 0;
            width: 100%;
            border-top: 1.5px solid;
          }
        }
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
      @media (min-width: $mobile) {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        transform: translateY(-100%);
        transition: transform 666ms;

        width: 100%;
        padding: ($gap * 4) $gap $gap;
        background-color: $green_dark;
        border-bottom-left-radius: $radius;
        border-bottom-right-radius: $radius;
      }

      input {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid;
        padding: $base;
        font-size: $base * 3;

        @media (max-width: $mobile) {
          font-size: $base * 2;
        }
      }
    }

    &.search {
      form {
        transform: translateY(0);
      }
    }

    button.search {
      @media (max-width: $mobile) {
        position: absolute;
        bottom: $base * 2.5;
        right: $base * 1.5;
      }
    }

    button.menu {
      @media (min-width: $mobile) {
        display: none;
      }

      &.button--green {
        padding: $base * 0.35;
      }
    }

    @media (max-width: $mobile) {
      justify-content: space-between;

      nav {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        padding: ($gap * 4) $gap $gap;
        background-color: $green;
        border-bottom-left-radius: $radius;
        border-bottom-right-radius: $radius;

        transform: translateY(-100%);
        transition: transform 666ms;

        flex-direction: column;
        align-items: center;

        :global(.h5) {
          font-size: $base * 2;
        }
      }

      .logo {
        :global(svg:first-child) {
          display: none;
        }
      }

      &.menu {
        nav {
          transform: translateY(0);
        }
      }
    }
  }
</style>