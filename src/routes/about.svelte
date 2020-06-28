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
			Prismic.Predicates.at('document.type', 'about'),
		);
		}).then(function(response) {
			// response is the response object, response.results holds the documents
			return { page : response.results[0] };
		});
	}
</script>

<script>
	import PrismicDOM from 'prismic-dom';
	export let page;

 console.log(page);
	var linkResolver = function(doc) {
	// Pretty URLs for known types
	if (doc.type === 'blog') return "/post/" + doc.uid;
	return "/" + doc.id;
	};
</script>

<style>
	.article {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<div class="article">
	<h1>{ page.data.title[0].text }</h1>

	{@html PrismicDOM.RichText.asHtml(page.data.description, linkResolver) }
</div>
