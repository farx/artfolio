<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'about'),
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

	Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
		Prismic.Predicates.at('document.type', 'about'),
	);
	}).then(function(response) {
		page = response.results[0];
	});

</script>

<style>
 content {
		background: var(--background-color) !important;
		color: var(--text-color) !important;
 }

	.cover {
		background-size: cover;
		background-image: var(--image-url);
	}

</style>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<content class='columns' style="--background-color: { page.data.background_color ? page.data.background_color : '#140b05' }; --text-color: { page.data.text_color ? page.data.text_color :  '#e6d6c6' }">
	<div class='column col-10 col-mx-auto cover' style="--image-url: url({ page.data.splash ? page.data.splash.url : "" })">
		<h1 class='mt-2'>{ page.data.title[0].text }</h1>
		<h2 class='mt-2'>{ page.data.subtitle[0] ? page.data.subtitle[0].text : "" }</h2>
	</div>
	<div class='column col-8 col-mx-auto'>
		{@html PrismicDOM.RichText.asHtml(page.data.description, linkResolver) }
	</div>
</content>
