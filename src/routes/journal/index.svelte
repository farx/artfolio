<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { slug } = page.params;

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('document.type', 'project'),
			  Prismic.Predicates.at('my.project.post_type', 'journal') ],
			{ fetch : 'project.title' }
		);
		}).then(function(response) {
			// response is the response object, response.results holds the documents
			return { posts : response.results };
		});
	}
</script>

<script>
	import PrismicDOM from 'prismic-dom';

	export let posts;
	console.log(posts);
	var linkResolver = function(doc) {
	// Pretty URLs for known types
	if (doc.type === 'project') return "/journal/" + doc.uid;
	return "/" + doc.id;
	};
</script>


<svelte:head>
	<title>Projects</title>
</svelte:head>

<ul>
	{#each posts as post}
		<li><a rel='prefetch' href='journal/{post.uid}'>{ post.data.title[0].text }</a></li>
	{/each}
</ul>
