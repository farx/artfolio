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
	console.log(post);
	var linkResolver = function(doc) {
	// Pretty URLs for known types
	if (doc.type === 'blog') return "/post/" + doc.uid;
	return "/" + doc.id;
	};
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{post.data.title[0].text}</title>
</svelte:head>

	<h1>{ post.data.title[0].text }</h1>

<div class='content'>
	{@html PrismicDOM.RichText.asHtml(post.data.content, linkResolver) }
</div>
