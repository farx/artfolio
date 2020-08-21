<script context="module">
	import Prismic from 'prismic-javascript';
	import { get } from 'svelte/store';

	export async function preload(page, session) {
		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('document.type', 'post'),
			  Prismic.Predicates.at('my.post.post_type', 'journal') ],
			{ fetch : [  'post.title', 'post.date', 'post.preview_photo_1', 'post.preview_photo_2' ],
			  orderings : '[my.post.order_score desc]',
			  lang : 'en-gb' }
		);
		}).then(function(response) {
			return { posts : response.results };
		});
	}
</script>
<script>
	import PrismicDOM from 'prismic-dom';
	import Post from '../components/Post.svelte';
	export let posts;
	import { lang, locales } from "./_settings.js";
	import LangSelector from "../components/LangSelector.svelte"
	import { afterUpdate } from 'svelte';

	let translations = [];
	translations = [{ url : "blog", code : "sv" }];
	afterUpdate(() => {
		lang.update((old) => { return {current:locales["en-gb"],translations : [{ url : "blog", code : "sv" }]}})
		translations = [{ url : "blog", code : "sv" }];
	});

</script>


<style>
	content {
		padding-top: 20vh;
	}
</style>

<svelte:head>
	<title>Journal</title>
</svelte:head>

<LangSelector { translations } />
<content class='columns'>
	<div class='column col-8 col-mx-auto'>
		<div class='columns'>
		{#each posts as post}
			<Post { post } />
		{:else}
			<p class="column text-center">{ $lang.current.pages.journal.no_posts_blurb }</p>
		{/each}
		</div>
	</div>
</content>
