<script lang="ts">
  import { page } from '$app/stores';
  import type { TypeRepsSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  export let item: Entry<TypeRepsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  let timeout: NodeJS.Timeout
  let form: HTMLFormElement
</script>

<form bind:this={form} class="flex flex--thick_gapped flex--spaced" action={`#${item.fields.id}`} id={item.fields.id} on:input={e => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    form.requestSubmit()
  }, 666)
}}>
  <hr>
  <aside class="col col--4of12 col--mobile--12of12">
    <h3>{item.fields.title}</h3>

    <fieldset>
      <label for={item.fields.id}>City, State...</label>
      <input type="text" name="search" id={item.fields.id} placeholder=" "
        value={$page.url.searchParams.get("search")}
        autofocus={$page.url.searchParams.has("search")}>
    </fieldset>
  </aside>

  <main class="col col--8of12 col--mobile--12of12">
    <ul class="list--nostyle">
      {#each ($page.data.reps?.items || item.fields.reps) as rep}
      <li class="flex flex--tight_gapped flex--spaced flex--middle flex--nowrap">
        <div>
          {rep.fields.name}<br>
          <strong>{rep.fields.city}, {rep.fields.state}{#if rep.fields.plus}, {rep.fields.plus}{/if}</strong>
        </div>
        {#if rep.fields.email}
        <a href="mailto:{rep.fields.email}"><svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.25 0H0.75C0.3375 0 0 0.333333 0 0.740741V19.2593C0 19.6667 0.3375 20 0.75 20H29.25C29.6625 20 30 19.6667 30 19.2593V0.740741C30 0.333333 29.6625 0 29.25 0ZM27.45 1.48148L15 13.7778L2.55 1.48148H27.45ZM1.5 2.51852L9.075 10L1.5 17.4815V2.51852ZM2.5875 18.5185L10.125 11.037L14.475 15.3333C14.625 15.4815 14.8125 15.5556 15 15.5556C15.1875 15.5556 15.375 15.4815 15.525 15.3333L19.875 11.037L27.4125 18.5185H2.5875ZM28.5 17.4815L20.925 10L28.5 2.51852V17.4815Z" /></svg></a>
        {/if}
      </li>
      {:else}
      <li>No matched results.</li>
      {/each}
    </ul>
  </main>
</form>

<style lang="scss">
  form {
    color: $greenish;
    padding: 0 ($gap * 2);

    @media (max-width: $mobile) {
      padding: 0;
    }

    hr {
      width: 100%;
    }

    h3 {
      margin-bottom: $base;
    }

    main {
      ul {
        li {
          padding: ($base * 0.66) ($base * 0.5) ($base * 0.5);
          border-bottom: 1px solid;

          strong {
            color: $green;
            font-weight: normal;
          }
        }
      }
    }
  }
  
</style>