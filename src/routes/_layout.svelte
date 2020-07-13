<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;
	export let api;

	api = process.env.SAPPER_APP_PRISMIC_API;
</script>


<svelte:head>
	<script>
	window.prismic = {
		endpoint: { api }
	};
	</script>
	<script type="text/javascript" src="https://static.cdn.prismic.io/prismic.min.js?new=true"></script>
</svelte:head>
<Nav { segment } />

<main>
	<slot></slot>
</main>

{#if segment !== undefined}
<Footer />
{/if}
