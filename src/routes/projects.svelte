<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('document.type', 'project'),
			  Prismic.Predicates.at('my.project.post_type', 'project') ],
			{ fetch : [  'project.title', 'project.date', 'project.preview_photo_1', 'project.preview_photo_2' ],
				orderings : '[my.project.order_score desc]' }
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

	Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
		[ Prismic.Predicates.at('document.type', 'project'),
			Prismic.Predicates.at('my.project.post_type', 'project') ],
		{ fetch : [  'project.title', 'project.date', 'project.preview_photo_1', 'project.preview_photo_2' ],
			orderings : '[my.project.order_score desc]' }
	);
	}).then(function(response) {
		posts = response.results;
	});


</script>

<style>
	content {
		padding-top: 20vh;
	}
</style>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<content class='columns'>
	<div class='column col-8 col-mx-auto'>
		<div class='columns'>
		{#each posts as post}
			<Post { post } />
		{:else}
			<p class="column text-center">no public projects yet...</p>
		{/each}
		</div>
	</div>
</content>
