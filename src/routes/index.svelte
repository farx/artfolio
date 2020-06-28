<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		const { slug } = page.params;

		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'homepage'),
		);
		}).then(function(response) {
			return { page : response.results[0] };
		});
	}
</script>

<script>
	export let page;
</script>

<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
		color: white;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 70;
		margin: 0 0 0.5em 0;
	}

	img {
		position: absolute;
		left: 0;
		top: 0;
		margin: 0;
		min-width: 100%;
		min-height: 100%;
		z-index: -1;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<img alt={ page.data.splash.alt } src={ page.data.splash.url }>

<h1>{ page.data.title[0].text }</h1>

<p><strong>{ page.data.description[0].text }</strong></p>
