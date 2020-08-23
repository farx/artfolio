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
	export let posts;
	import { lang, locales } from "./_settings.js";
	import Posts from "../components/Posts.svelte"
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		lang.update((old) => { return {current:locales["en-gb"],translations : [{ url : "blog", code : "sv" }]}})
	});

</script>

<svelte:head>
	<title>Journal</title>
</svelte:head>

<Posts { posts } />
