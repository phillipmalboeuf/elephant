<script lang="ts">
  import type { Entry } from 'contentful'

  import Media from '$lib/components/Media.svelte'
  import Document from '$lib/components/document/index.svelte'
  import Slider from '$lib/components/Slider.svelte';
  import Content from '$lib/components/Content.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types' 
  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.fields.title} – Elephant Play</title>
	<meta name="description" content="{data.page.fields.description}" />
</svelte:head>


{#if data.page.fields.content?.length}
<Content content={data.page.fields.content} />
{/if}

<style lang="scss">
</style>