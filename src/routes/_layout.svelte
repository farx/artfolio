<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'settings'),
		);
		}).then(function(response) {
			return { settings : response.results[0] };
		});
	}
</script>

<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
	export let settings;
</script>

<Nav { segment } { settings }/>

<main>
	<slot></slot>
</main>
