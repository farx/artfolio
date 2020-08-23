<script context="module">
	import Prismic from 'prismic-javascript';


	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'about'),
			{ lang : 'en-gb' }
		);
		}).then(function(response) {
			return { page : response.results[0] };
		});
	}
</script>

<script>
	import Page from "../components/PageWithCoverImage.svelte"

	import { lang, locales } from "../routes/_settings.js";

	export let page;

	lang.update((old) => { return { current : locales["en-gb"], translations : [{ url : "om", code : "sv" }]} })


</script>


<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>


<Page { page } />
