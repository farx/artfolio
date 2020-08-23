<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'contact'),
			{ lang : "en-gb" }
		);
		}).then(function(response) {
			return { page : response.results[0] };
		});
	}
</script>

<script>
export let page;

import { lang, locales } from "../routes/_settings.js";

import PageWithImage from "../components/PageWithImage.svelte"

import { afterUpdate } from 'svelte';

let translations = [];
translations = [{ url : "kontakt", code : "sv" }];
afterUpdate(() => {
	lang.update((old) => { return { current : locales["en-gb"], translations : [{ url : "kontakt", code : "sv" }]} })
	translations = [{ url : "kontakt", code : "sv" }];
});

</script>

<svelte:head>
<title>{ page.data.title[0].text }</title>
</svelte:head>

<PageWithImage { page } { translations }  />
