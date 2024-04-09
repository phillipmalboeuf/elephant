<script lang="ts">
  import type { TypeCollectionSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'

  export let item: Entry<TypeCollectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<details style:--color={item.fields.color}>
  <summary class="flex flex--gapped flex--spaced">
    <hr>
    <h3>{item.fields.title}</h3>
    <button>See all from {item.fields.title} <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L8.5 8L16 1" stroke="currentColor"/></svg></button>

    {#if item.fields.products?.length}
    <ol class="list--nostyle flex flex--gapped">
      {#each item.fields.products as product, i}
      {#if i < 3}
      <li class="col col--4of12">
        <a href="/products/{product.fields.id}">
          <figure>
            {#if product.fields.thumbnail}
            <Media media={product.fields.thumbnail} ar={0.75} />
            {/if}
          </figure>
          <h6>{product.fields.title}</h6>
        </a>
      </li>
      {/if}
      {/each}
    </ol>
    {/if}
  </summary>

  <main class="flex flex--gapped">
    <hr>

    <p class="col col--6of12">À propos de cette série</p>
    <p class="col col--6of12">{item.fields.description}</p>

    <hr>

    {#if item.fields.products?.length}
    <ol class="list--nostyle flex flex--gapped">
      {#each item.fields.products as product, i}
      <li class="col col--4of12">
        <a href="/products/{product.fields.id}">
          <figure>
            {#if product.fields.thumbnail}
            <Media media={product.fields.thumbnail} ar={0.75} />
            {/if}
          </figure>
          <h6>{product.fields.title}</h6>
        </a>
      </li>
      {/each}
    </ol>
    {/if}
  </main>
</details>

<style lang="scss">
  details {
    color: $white;
    background-color: var(--color, $green);
    padding: $base;
    border-radius: $radius * 0.66;

    summary {
      cursor: pointer;

      button {
        color: currentColor;
        background-color: transparent;
        pointer-events: none;
      }
    }

    main {
      margin-top: $gap * 3;

      p {
        font-size: $base * 0.75;
      }
    }

    &[open] {
      summary ol {
        display: none;
      }

      ol {
        margin: ($gap * 2) 0;
        row-gap: $gap * 2;
      }
    }
  }

  hr {
    width: 100%;
    margin: 0;
  }

  h3 {
    text-transform: uppercase;
  }

  h6 {
    text-align: center;
    margin-top: $base;
  }
</style>