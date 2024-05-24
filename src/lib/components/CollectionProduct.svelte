<script lang="ts">
  import type { Entry } from 'contentful'
  import type { TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'

  import Media from './Media.svelte'
  
  export let product: Entry<TypeProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> = undefined
  export let collection: Entry<TypeCollectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> | { fields: Entry<TypeCollectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">['fields'] } = undefined
</script>

<a href="{collection ? `/collections/${collection.fields.id}` : '/products'}/{product.fields.id}">
  <figure>
    {#if product.fields.thumbnails?.length}
    {#each product.fields.thumbnails as media}
    <Media {media} ar={0.75} />
    {/each}
    {:else if product.fields.thumbnail}
    <Media media={product.fields.thumbnail} ar={0.75} />
    {/if}
  </figure>
  <h6>{product.fields.title}</h6>
</a>

<style lang="scss">
  a {
    padding: $gap;

    figure {
      position: relative;
      overflow: hidden;

      :global(picture),
      :global(video) {
        border-radius: $radius;

        &:not(:first-child) {
          position: absolute;
          inset: 0;
          display: none;
          background-color: $white;
        }
      }
    }

    h6 {
      text-align: center;
      margin-top: $base * -2;
      position: relative;
      z-index: 2;
    }

    &:hover,
    &:focus {
      figure {
        :global(picture),
        :global(video) {

          &:not(:first-child) {
            display: block;
          }
        }
      }

      h6 {
        color: $black;
      }
    }
  }
</style>