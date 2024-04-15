<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Media from '$lib/components/Media.svelte'
  import Slider from '$lib/components/Slider.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

{#if data.page.fields.content?.length}
<Content content={data.page.fields.content} />
{/if}

<style lang="scss">
</style>