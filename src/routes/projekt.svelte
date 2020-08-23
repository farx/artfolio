<script context="module">

	import Prismic from 'prismic-javascript';
	import { get } from 'svelte/store';

	export async function preload(page, session) {
		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('document.type', 'post'),
			  Prismic.Predicates.at('my.post.post_type', 'project') ],
			{ fetch : [  'post.title', 'post.date', 'post.preview_photo_1', 'post.preview_photo_2' ],
			  orderings : '[my.post.order_score desc]',
			  lang : 'sv-se' }
		);
		}).then(function(response) {
			return { posts : response.results };
		});
	}
</script>

<script>
	import Posts from '../components/Posts.svelte';

	import { lang, locales } from "./_settings.js";
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		lang.set({ current : locales["sv-se"],translations : [{ url : "projects", code : "en" }]} )
	});

	export let posts;
</script>

<svelte:head>
	<title>Projekt</title>
</svelte:head>

<Posts { posts }/>
