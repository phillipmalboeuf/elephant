<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n'

	import '../styles/styles.scss'

	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Downloads from '$lib/components/Downloads.svelte'

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

<ParaglideJS {i18n}>
<div class="{$page.route.id.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {$page.url.pathname.replaceAll('/', '-')}">
	<Header navigation={data.primary} />

	<main>
		<slot />
	</main>

	<Downloads />
	<Footer primary={data.primary} social={data.social} contact={data.contact} />
</div>
</ParaglideJS><style lang="scss">

	main {
		min-height: 100vh;
	}
</style>
