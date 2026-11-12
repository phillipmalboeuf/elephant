<script lang="ts">
  // import Gallery from '../Gallery.svelte'
  import Media from '../Media.svelte'
  import Mark from './mark.svelte'

  import { page } from '$app/stores'

  import type { Block, Inline, Text } from '@contentful/rich-text-types'
  // Nested table/list nodes are not TopLevelBlock; Block covers recursive rendering.
  export let node: Block | Inline | Text

  export let details = false
  export let i: number = 0

  const kids = (n: Block | Inline | Text) =>
    n.nodeType === 'text' ? [] : ((n as Block | Inline).content ?? [])
</script>

{#if node.nodeType === 'heading-1'}
  <h1>{#each kids(node) as mark}<Mark mark={mark} {i} />{/each}</h1>
{:else if node.nodeType === 'heading-2'}
  <h2>{#each kids(node) as mark}<Mark mark={mark} {i} />{/each}</h2>
{:else if node.nodeType === 'heading-3'}
  <h3>{#each kids(node) as mark}<Mark mark={mark} {i} />{/each}</h3>
{:else if node.nodeType === 'heading-4'}
  <h4>{#each kids(node) as mark}<Mark mark={mark} {i} />{/each}</h4>
{:else if node.nodeType === 'heading-5'}
  <h5>{#each kids(node) as mark}<Mark mark={mark} {i} />{/each}</h5>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each kids(node) as mark}<Mark mark={mark} {i} />{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each kids(node) as mark}<Mark mark={mark} {i} />{/each}</p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each kids(node) as item}<li>{#each kids(item) as child}<svelte:self node={child} />{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'table'}
  {#if details && kids(kids(node)[0])[0]?.nodeType !== 'table-header-cell'}
  <section class="table">
    {#each kids(node) as item}<details>{#each kids(item) as child, i}<svelte:self node={child} details {i} />{/each}</details>{/each}
  </section>
  {:else}
  <table>
    {#each kids(node) as item}<tr style="--length: {kids(item).length}">{#each kids(item) as child}<svelte:self node={child} />{/each}</tr>{/each}
  </table>
  {/if}
{:else if node.nodeType === 'table-header-cell'}
  {#if details}
  {#if i === 0}
  <summary>{#each kids(node) as item}<svelte:self node={item} />{/each} <svg width="0.75em" height="0.75em" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"> <line x1="0.707107" y1="0.7072" x2="7.77817" y2="7.77827" stroke-width="2"/> <line x1="13.4337" y1="0.707107" x2="6.3626" y2="7.77817" stroke-width="2"/> </svg></summary>
  {:else}
  <main>{#each kids(node) as item}<svelte:self node={item} />{/each}</main>
  {/if}
  {:else}
  <th colspan="2">{#each kids(node) as item}<svelte:self node={item} />{/each}</th>
  {/if}
{:else if node.nodeType === 'table-cell'}
  {#if details}
  {#if i === 0}
  <summary>{#each kids(node) as item}<svelte:self node={item} />{/each} <svg width="0.75em" height="0.75em" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"> <line x1="0.707107" y1="0.7072" x2="7.77817" y2="7.77827" stroke-width="2"/> <line x1="13.4337" y1="0.707107" x2="6.3626" y2="7.77817" stroke-width="2"/> </svg></summary>
  {:else}
  <main>{#each kids(node) as item}<svelte:self node={item} />{/each}</main>
  {/if}
  {:else}
  <td>{#each kids(node) as item}<svelte:self node={item} />{/each}</td>
  {/if}

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each kids(node) as code}<svelte:self node={code} />{/each}</blockquote>

{:else if node.nodeType === 'embedded-asset-block'}
<Media media={node.data.target} />
{:else if node.nodeType === 'embedded-entry-block'}
  <!-- {#if node.data.target.sys.contentType.sys.id === 'collaboratorSlider'}
  {#if !$page.data.isMobile}
  <Gallery images={node.data.target.fields.collaborators.map(collaborator => ({
    thumbnail: collaborator.fields.photo,
    content: collaborator.fields,
    href: collaborator.fields.tagIdentifier && `films?director=${collaborator.fields.tagIdentifier}`
  }))}>
    <h6 slot="content" let:content={content}>
      {#if content.tagIdentifier}<a href={`films?director=${content.tagIdentifier}`}>{content.name}</a>{:else}{content.name}{/if}<br />
      {content.profession}<br />
    </h6>
  </Gallery>
  {:else}
  <div style="margin: 2rem 0">
  {#each node.data.target.fields.collaborators as collaborator}
  <a href="{collaborator.fields.tagIdentifier && `films?director=${collaborator.fields.tagIdentifier}`}">
    <h2>{collaborator.fields.name}</h2>
  </a>
  {/each}
  </div>
  {/if}
  {/if} -->
{/if}

<style lang="scss">
  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap;

    svg {
      transform: rotate(0);
      transition: transform 333ms;

      :global([open]) > & {
        transform: rotate(-180deg);
      }
    }
  }
</style>