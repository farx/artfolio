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
 .card {
	width: 16em;
	height: 16em;
	margin-bottom: 2em;
	background-color: #e6d6c6;
	background-image: var(--preview-photo-1-url);
	background-position: center 0;
	background-size: cover;
	transition: background-image 1s ease-in-out;
	color: #a7562b !important;
	border-color:  #e6d6c6;
 }
 .card:hover {
	background-image: var(--preview-photo-2-url);
 }
 .post-title {
	 width: 16em;
	 margin-bottom: 3em;
 }

 .post-title h4 {
	 font-style: italic;
 }
</style>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<content class='columns'>
	<div class='column col-8 col-mx-auto'>
		<div class='columns'>
		{#each posts as post}
		<div class='column col-6 col-md-12'>
			<a rel='prefetch' href='post/{post.uid}'>
			<div class="card p-centered" style="--preview-photo-1-url: url({ post.data.preview_photo_1 ? post.data.preview_photo_1.url : '' }); --preview-photo-2-url: url({ post.data.preview_photo_2 ? post.data.preview_photo_2.url : '' })">
			</div>
			</a>
			<div class="post-title p-centered">
				<a rel='prefetch' href='post/{post.uid}'>
					<h4>{ post.data.title[0].text }</h4>
				</a>
				<p>{ post.data.date ? post.data.date.substring(0,4) : "" }</p>
			</div>
		</div>
		{/each}
		</div>
	</div>
</content>
