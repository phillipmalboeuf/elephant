<script lang="ts">
  import { page } from '$app/stores'
  import { languageTag } from '$lib/paraglide/runtime'

  let timeout: NodeJS.Timeout
  let form: HTMLFormElement
</script>

<form class="flex flex--tight_gapped" action="/search" bind:this={form} on:input={e => {
  // clearTimeout(timeout)
  // timeout = setTimeout(() => {
  //   form.requestSubmit()
  // }, 666)
}}>
  <fieldset>
    <label for="query">{languageTag() === 'fr' ? 'Nom du produit ou son #' : 'Product name or #'}</label>
    <input type="text" name="query" id="query" value={$page.url.searchParams.get("query")} autofocus={!!$page.url.searchParams.get("query")} placeholder=" ">
  </fieldset>
  <button class="button--green" type="submit">{languageTag() === 'fr' ? 'Recherche' : 'Search'}</button>
</form>

<style lang="scss">
  form {
    fieldset {
      width: auto;
      flex: 1;
    }
  }
</style>