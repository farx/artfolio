<script context="module">
	import Prismic from 'prismic-javascript';
	import { lang } from "./_settings.js";
	import { get } from 'svelte/store';

	export async function preload(page, session) {
		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('document.type', 'post'),
			  Prismic.Predicates.at('my.post.post_type', 'journal') ],
			{ fetch : [  'project.title', 'project.date', 'project.preview_photo_1', 'project.preview_photo_2' ],
			  orderings : '[my.project.order_score desc]',
			  lang : get(lang).code }
		);
		}).then(function(response) {
			return { posts : response.results };
		});
	}
</script>
<script>
	import PrismicDOM from 'prismic-dom';
	import Post from '../components/Post.svelte';
	import { onDestroy } from "svelte";
	export let posts;


	Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
		[ Prismic.Predicates.at('document.type', 'post'),
			Prismic.Predicates.at('my.post.post_type', 'journal') ],
			{ fetch : [  'project.title', 'project.date', 'project.preview_photo_1', 'project.preview_photo_2' ],
			orderings : '[my.project.order_score desc]',
			lang : $lang.code }
	);
	}).then(function(response) {
		posts = response.results;
	});

	const unsubscribe = lang.subscribe(value => {
		Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('document.type', 'post'),
				Prismic.Predicates.at('my.post.post_type', 'journal') ],
				{ fetch : [  'project.title', 'project.date', 'project.preview_photo_1', 'project.preview_photo_2' ],
				orderings : '[my.project.order_score desc]',
				lang : $lang.code }
		);
		}).then(function(response) {
			posts = response.results;
		});
	});

	onDestroy(() => unsubscribe);

</script>


<style>
	content {
		padding-top: 20vh;
	}
</style>

<svelte:head>
	<title>Journal</title>
</svelte:head>

<content class='columns'>
	<div class='column col-8 col-mx-auto'>
		<div class='columns'>
		{#each posts as post}
			<Post { post } />
		{:else}
			<p class="column text-center">{ $lang.pages.journal.no_posts_blurb }</p>
		{/each}
		</div>
	</div>
</content>
