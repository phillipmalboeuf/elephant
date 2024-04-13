<script lang="ts">
  import { downloads } from '$lib/stores'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  let open = true
  let list: HTMLElement

  onMount(() => {
    if (localStorage.getItem('downloads')) {
      downloads.set(JSON.parse(localStorage.getItem('downloads')))
    }

    downloads.subscribe(value => {
      localStorage.setItem('downloads', JSON.stringify(value))
      open = true
    })
  })
</script>

{#if $downloads?.length}
<aside transition:fly={{ y: '100%', opacity: 1 }}>
  <details bind:open>
    <summary>Downloads <svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L11.5 11L22 1" stroke="currentColor" stroke-width="2"/></svg></summary>

    <main>
      <ol class="list--nostyle" bind:this={list}>
        {#each $downloads as download, index}
        <li in:fly={{ y: '100%' }}>
          <a href={`/downloads?files=${download.sys.id}`} download={download.fields.file.fileName} class="button button--none">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.14258L6.5 9.85686L12 5.14258" stroke="currentColor"/><line x1="6.5" y1="-2.18557e-08" x2="6.5" y2="9.42857" stroke="currentColor"/> <line x1="12" y1="12.5" x2="1" y2="12.5" stroke="currentColor"/></svg>

            {download.fields.title}
          </a>

          <button class="button--none" on:click={() => {
            downloads.set($downloads.filter((_, i) => i !== index))
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3.18217" y1="3.1816" x2="9.54613" y2="9.54556" stroke="currentColor"/>
            <line x1="9.54618" y1="3.18168" x2="3.18222" y2="9.54564" stroke="currentColor"/>
            </svg>
          </button>
        </li>
        {/each}
      </ol>

      <nav class="flex flex--tight_gapped">
        <button class="button--green" on:click={() => list.querySelectorAll('a')
          .forEach((a, i) => setTimeout(() => a.click(), 50 * i))}>Download all</button>
        <button class="button--green" on:click={() => downloads.set([])}>Clear list</button>
      </nav>
    </main>
  </details>
</aside>
{/if}

<style lang="scss">
  aside {
    position: fixed;
    bottom: 0;
    z-index: 8;
    right: $base;
    min-width: $base * 20;

    padding: ($base * 0.5) $base;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;

    color: $white;
    background-color: $green;

    details {

      summary {
        cursor: pointer;
        font-size: $base;
        display: flex;
        justify-content: space-between;
        align-items: center;

        svg {
          transform: rotate(180deg);
          transition: transform 333ms;
        }
      }

      &[open] {

        summary {
          border-bottom: 1px solid;
          padding-bottom: $base * 0.5;
          margin-bottom: $base;

          svg {
            transform: rotate(0deg);
          }
        }
      }

      ol {
        margin-bottom: $gap;

        li {
          display: flex;
          justify-content: space-between;
          gap: $gap;

          padding: ($base * 0.25) 0;
          border-bottom: 1px solid $green_dark;

          svg {
            color: $green_dark;
          }
        }
      }
    }
  }
</style>