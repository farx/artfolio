<script context="module">
	import Prismic from 'prismic-javascript';
	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('my.post.uid', slug) ]
		);
		}).then(function(response) {
			return { post : response.results[0], slug : slug };
		});
	};
</script>

<script>
	import PrismicDOM from 'prismic-dom';
	import { linkResolver } from '../_linkresolver.js';
	export let post;
	export let slug;
	Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
		[ Prismic.Predicates.at('my.post.uid', slug) ]
	);
	}).then(function(response) {
		post = response.results[0];
	});
</script>

<style>
 content {
		background: var(--background-color) !important;
		color: var(--text-color) !important;
 }

 .title {
	 font-size: 4em;
	 font-style: italic;
	 text-align: center;
 }

 .subtitle {
	 margin-bottom: 4em;
 }

 .cover {
	 min-height: 40vh;
 }

</style>
<svelte:head>
	<title>{post.data.title[0].text}</title>
</svelte:head>

<content class='columns' style="--background-color: { post.data.background_color ? post.data.background_color : '#140b05' }; --text-color: { post.data.text_color ? post.data.text_color :  '#e6d6c6' }">
	<div class='column col-10 col-mx-auto cover'>
		<h1 class='title mt-2'>{ post.data.title[0].text }</h1>
		<h2 class='subtitle mt-2'>{ post.data.subtitle[0].text }</h2>
	</div>
	<div class='column content col-mx-auto col-6 col-lg-8 col-md-10 col-sm-11'>
		{@html PrismicDOM.RichText.asHtml(post.data.content, linkResolver) }
	</div>
</content>
