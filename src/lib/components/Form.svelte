<script lang="ts">
  import type { TypeFormSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { enhance } from '$app/forms'
  
  import Media from './Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Link from './Link.svelte'
  import { page } from '$app/stores';

  export let item: Entry<TypeFormSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<form class="flex flex--gapped" action={item.fields.action} method="post" use:enhance>
  <hr>
  <h2 class="col col--8of12 col--mobile--12of12">{item.fields.title}</h2>

  <main class="col col--12of12 flex flex--tight_gapped">
    {#each item.fields.inputs as input}
    <fieldset class="col {input.fields.type === 'Textarea' ? 'col--8of12' : 'col--4of12'} col--mobile--12of12">
    <label for={item.fields.id + input.fields.id}>{input.fields.label}</label>
    {#if input.fields.type === 'Email'}
    <input type="email" id={item.fields.id + input.fields.id} name={input.fields.id} placeholder=" " required />
    {:else if input.fields.type === 'Textarea'}
    <textarea id={item.fields.id + input.fields.id} name={input.fields.id} placeholder=" " required></textarea>
    {:else if input.fields.type === 'Dropdown'}
    <select id={item.fields.id + input.fields.id} name={input.fields.id} required>
      <option disabled selected></option>
      {#each input.fields.options as option}
      <option>{option}</option>
      {/each}
    </select>
    {:else}
    <input type="text" id={item.fields.id + input.fields.id} name={input.fields.id} placeholder=" " required>
    {/if}
    </fieldset>
    {/each}

    {#if $page.form?.Message}
    <strong>Thank you, we'll get in touch!</strong>
    {:else}
    <button class="button--green" type="submit">{item.fields.button}</button>
    {/if}
  </main>
</form>

<style lang="scss">
  form {
    color: $green_darkish;
    margin: ($gap * 2) 0 ($gap * 2);
    padding: 0 ($gap * 2);

    @media (max-width: $mobile) {
      padding: 0;
    }

    hr {
      width: 100%;
    }

    main {
      position: relative;
      padding: $base;
      border-radius: $radius;
      background-color: $white;
      flex-direction: column;

      @media (min-width: $mobile) {
        fieldset:has(textarea) {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          padding: $base;

          textarea {
            height: 100%;
            font-size: $base;
          }
        }


        button {
          margin-top: $base * 8;
        }
      }
    }
  }
</style>