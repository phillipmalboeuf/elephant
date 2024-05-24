<script lang="ts">
  import { page } from '$app/stores'
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
    <label for="query">Nom du produit ou #</label>
    <input type="text" name="query" id="query" value={$page.url.searchParams.get("query")} autofocus={!!$page.url.searchParams.get("query")} placeholder=" ">
  </fieldset>
  <button class="button--green" type="submit">Recherche</button>
</form>

<style lang="scss">
  form {
    fieldset {
      width: auto;
      flex: 1;
    }
  }
</style>