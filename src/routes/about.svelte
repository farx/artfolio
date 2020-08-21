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
	import PrismicDOM from 'prismic-dom';
	import { linkResolver } from './_linkresolver.js';

	import { lang, locales } from "../routes/_settings.js";
	import LangSelector from "../components/LangSelector.svelte"

	export let page;

	import { afterUpdate } from 'svelte';

	let translations = [];
	translations = [{ url : "om", code : "sv" }];
	afterUpdate(() => {
		lang.update((old) => { return { current : locales["en-gb"], translations : [{ url : "om", code : "sv" }]} })
		translations = [{ url : "om", code : "sv" }];
	});


</script>

<style>
	content {
			background: var(--background-color);
			color: var(--text-color) !important;
	}

	.cover {
		background-size: cover;
		background-image: var(--image-url);
		width: 100%;
	}

	.title {
		font-size: 4em;
		text-align: right;
		font-style: italic;
	}

	.subtitle {
		text-align: right;
	}

	.titlecolumn {
		padding-top: 20vh;
	}
</style>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<LangSelector { translations } />
<content class='columns' style="--background-color: { page.data.background_color ? page.data.background_color : '#140b05' }; --text-color: { page.data.text_color ? page.data.text_color :  '#e6d6c6' }">
	<div class='cover' style="--image-url: url({ page.data.splash ? page.data.splash.url : ''});">
		<div class='column col-10 col-mx-auto titlecolumn'>
			<h1 class='mt-2 title'>{ page.data.title[0].text }</h1>
			<h2 class='mt-2 subtitle'>{ page.data.subtitle[0] ? page.data.subtitle[0].text : "" }</h2>
		</div>
	</div>
	<div class='column col-8 col-mx-auto'>
		{@html PrismicDOM.RichText.asHtml(page.data.description, linkResolver) }
	</div>
</content>
