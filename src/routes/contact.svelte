<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'contact'),
		);
		}).then(function(response) {
			// response is the response object, response.results holds the documents
			return { page : response.results[0] };
		});
	}
</script>

<script>
	import PrismicDOM from 'prismic-dom';
	import { linkResolver } from './_linkresolver.js';
	export let page;
</script>

<style>
 content {
		background: var(--background-color) !important;
		color: var(--text-color) !important;
 }


</style>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<content class='columns' style="--background-color: { page.data.background_color ? page.data.background_color : '#140b05' }; --text-color: { page.data.text_color ? page.data.text_color :  '#e6d6c6' }">
	<div class='column col-10 col-mx-auto cover'>
		<h1 class='mt-2'>{ page.data.title[0].text }</h1>
		{@html PrismicDOM.RichText.asHtml(page.data.description, linkResolver) }
	</div>
</content>
