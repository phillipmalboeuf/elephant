<script lang="ts">
  import ProductPage from '../../../products/[id]/+page.svelte'

  import type { PageData } from './$types' 
  export let data: PageData
</script>

<ProductPage {data} />