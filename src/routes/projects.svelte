<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('document.type', 'project'),
			  Prismic.Predicates.at('my.project.post_type', 'project') ],
																					 { fetch : [  'project.title', 'project.preview_photo_1', 'project.preview_photo_2' ],
																						 orderings : '[my.project.order_score desc]' }
		);
		}).then(function(response) {
			return { posts : response.results };
		});
	}
</script>

<script>
	import PrismicDOM from 'prismic-dom';

	export let posts;
</script>

<style>

 content {

	 padding-top: 4em;
 }
 .card {
	width: 16em;
	height: 16em;
	 background-color: gray;
	background-image: var(--preview-photo-1-url);
	background-position: center 0;
	background-size: cover;
	transition: background-image 1s ease-in-out;
 }
 .card:hover {
	background-image: var(--preview-photo-2-url);
 }
 .card-header {
	 background: linear-gradient(black,rgba(0,0,0,0));
 }
</style>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<content class='columns'>
	<div class='column col-8 col-mx-auto'>
		<div class='columns'>
		{#each posts as post}
		<div class='column col-6 col-sm-12'>
			<div class="card p-centered" style="--preview-photo-1-url: url({ post.data.preview_photo_1 ? post.data.preview_photo_1.url : "" })">
				<div class="card-header">
					<div class="card-title h5"><a rel='prefetch' href='post/{post.uid}'>{ post.data.title[0].text }</a></div>
				</div>
			</div>
		</div>
		{/each}
		</div>
	</div>
</content>
