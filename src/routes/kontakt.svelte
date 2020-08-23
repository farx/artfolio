<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'contact'),
			{ lang : 'sv-se' }
		);
		}).then(function(response) {
			return { page : response.results[0] };
		});
	}
</script>

<script>

	export let page;

	import { lang, locales } from "../routes/_settings.js";
	import { afterUpdate } from 'svelte';

	import PageWithImage from "../components/PageWithImage.svelte"

	afterUpdate(() => {
		lang.update((old) => { return { current : locales["sv-se"], translations : [{ url : "contact", code : "en" }]} })
	});

</script>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<PageWithImage { page } />
