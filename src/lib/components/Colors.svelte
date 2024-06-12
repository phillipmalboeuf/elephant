<script lang="ts">
  import type { Entry } from 'contentful'
  import type { TypeColorSkeleton, TypeColorsSkeleton } from '$lib/clients/content_types'

  export let item: Entry<TypeColorsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let current: Entry<TypeColorSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> = undefined
</script>

<div class="flex flex--tight_gapped" on:pointerleave={() => current = undefined}>
  <h6><small>{item.fields.title}</small>{#if current}<small>{current.fields.title} {current.fields.sku}</small>{:else}{#if item.fields.subtitle}<small>{item.fields.subtitle}</small>{/if}{/if}</h6>
  <hr>
  <ul class="list--nostyle flex flex--tight_gapped">
    {#if item.fields.colours?.length}
    {#each item.fields.colours as c}
    <button style:--color={c.fields.color} aria-label={c.fields.title} class:white={c.fields.color.toLowerCase().startsWith('#fff')}
      on:pointerenter={() => current = c}></button>
    {/each}
    {:else if item.fields.colors?.length}
    {#each item.fields.colors as c}
    <li style:--color={c} class:white={c.toLowerCase().startsWith('#fff')}></li>
    {/each}
    {/if}
  </ul>
</div>

<style lang="scss">
  div {
    @media (min-width: $mobile) {
      flex: 1;
    }

    @media (max-width: $mobile) {
      margin-top: $base * 0.5;
    }
  }

  h6 {
    text-transform: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  hr {
    width: 100%;
    margin-bottom: $base * 0.25;
  }

  ul {
    li,
    button {
      width: $base * 2;
      height: $base * 2;
      padding: 0;
      border-radius: 50%;
      background-color: var(--color, $black);
      border: 1.5px solid transparent;

      &.white {
        border-color: $grey;
      }
    }
  }
</style>