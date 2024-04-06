<script lang="ts">
	import '../styles/styles.scss'

	import Header from '$lib/components/Header.svelte'
	// import Footer from '$lib/components/Footer.svelte'
	// import Cursor from '$lib/components/Cursor.svelte'

	import { page } from '$app/stores'

	import type { LayoutData } from './$types'
	export let data: LayoutData
</script>

<svelte:head>
	{#if $page.data.page?.fields}
	<title>{$page.data.page.fields.title}</title>
	<meta name="description" content={$page.data.page.fields.description} />
	{/if}
</svelte:head>

<Header />

<main>
  <slot />
</main>

<style lang="scss">

	main {
		min-height: 100vh;
	}
</style>
