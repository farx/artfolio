<script context="module">
	import Prismic from 'prismic-javascript';
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			[ Prismic.Predicates.at('my.project.uid', slug) ]
		);

		}).then(function(response) {
			// response is the response object, response.results holds the documents
			return { post : response.results[0] };
		});
	};
</script>

<script>
	import PrismicDOM from 'prismic-dom';
	export let post;
	var linkResolver = function(doc) {
	// Pretty URLs for known types
	if (doc.type === 'project') return "/journal/" + doc.uid;
	return "/" + doc.id;
	};
</script>


<svelte:head>
	<title>{post.data.title[0].text}</title>
</svelte:head>

	<h1>{ post.data.title[0].text }</h1>

<div class='content'>
	{@html PrismicDOM.RichText.asHtml(post.data.content, linkResolver) }
</div>
