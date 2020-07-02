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
	}

	.title {
		font-size: 10em;
		letter-spacing: .6rem;
		font-style: italic;
	}

	.subtitle {
		font-size: 1.5em;
		margin: 0 0 -3em 0;
		letter-spacing: .2rem;
		font-style: italic;
	}

 .cover {
		background-image: var(--image-url);
		background-position: center 0;
 }

</style>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<content style="--color1: { page.data.main_color }; --color2: { page.data.secondary_color }; --color3: { page.data.tertiary_color } ">
	<div class="cover" style="--image-url: url({ page.data.splash.url })">

	<p class="subtitle">{ page.data.description[0].text }</p>
	<h1 class="title">{ page.data.title[0].text }</h1>

	</div>
</content>
