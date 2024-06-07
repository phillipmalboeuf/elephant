<script lang="ts">
  import type { TypeRealisationsSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Media from './Media.svelte'
  import { page } from '$app/stores';

  export let item: Entry<TypeRealisationsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> | { fields: Entry<TypeRealisationsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">['fields'] }
</script>

{#if item.fields?.projects.length}
<ol class="list--nostyle">
  {#each item.fields.projects as project, i}
  <li class="flex">
    <a class="col col--7of12 col--mobile--12of12" href="/projects/{project.fields.id}">
      <figure>
        {#if project.fields.thumbnail}
        <Media media={project.fields.thumbnail} ar={0.5} />
        {/if}
      </figure>
    </a>
    <aside class="col col--5of12 col--mobile--12of12">
      <hr />
      <h4>{project.fields.title}</h4>
      <div class="flex">
        <p>{project.fields.location}</p>
        <a class="button button--green" href="/projects/{project.fields.id}">Read more</a>
      </div>
    </aside>
  </li>
  {/each}
</ol>
{/if}


<style lang="scss">
  ol {
    padding: $gap;

    @media (max-width: $mobile) {
      padding: 0;
    }

    li {
      align-items: stretch;
      color: $green_dark;
      background-color: $white;
      border-radius: $radius;
      margin-bottom: $gap;

      figure {
        :global(img),
        :global(video) {
          @media (min-width: $mobile) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          @media (max-width: $mobile) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }

      aside {
        display: flex;
        flex-direction: column;
        padding: $base;

        hr {
          width: 100%;

          @media (max-width: $mobile) {
            margin-top: 0;
          }
        }

        h4 {
          margin-bottom: auto;
          @media (max-width: $mobile) {
            margin-bottom: $gap * 2;
          }
        }

        .button {
          margin-left: auto;
        }

        div {
          align-items: flex-end;
        }
      }
    }
  }
</style>