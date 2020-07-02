<script context="module">
	import Prismic from 'prismic-javascript';
	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('my.project.uid', slug) ]
		);
		}).then(function(response) {
			return { post : response.results[0] };
		});
	};
</script>

<script>
	import PrismicDOM from 'prismic-dom';
	import { linkResolver } from '../_linkresolver.js';
	export let post;
</script>

<style>
 content {
		background: var(--background-color) !important;
		color: var(--text-color) !important;
 }

</style>
<svelte:head>
	<title>{post.data.title[0].text}</title>
</svelte:head>

<content class='columns' style="--background-color: { post.data.background_color ? post.data.background_color : '#140b05' }; --text-color: { post.data.text_color ? post.data.text_color :  '#e6d6c6' }">
	<div class='column col-10 col-mx-auto cover'>
		<h1 class='mt-2'>{ post.data.title[0].text }</h1>
		<h2 class='mt-2'>{ post.data.subtitle[0].text }</h2>
		<div class='text-center mb-1'>
			<i class="icon icon-4x icon-arrow-down"></i>
		</div>
	</div>
	<div class='column content col-mx-auto col-6 col-lg-8 col-md-10 col-sm-11'>
		{@html PrismicDOM.RichText.asHtml(post.data.content, linkResolver) }
	</div>
</content>
