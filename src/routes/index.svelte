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
	.title-wrapper {
		text-align: center;
		margin: 4em auto;
	}

	.title {
		font-size: 12em;
		letter-spacing: .2em;
		font-style: italic;
		margin-top: -0.48em;
	}

	.subtitle {
		font-size: 1.5em;
		letter-spacing: .40em;
		font-style: italic;
	}

	.cover {
		background-size: cover;
		background-image: var(--image-url);
		background-position: 0 0;
	}

	@media (max-width: 500px) {
		.title {
			font-size: 10em;
			letter-spacing: .1em;
		}

		.subtitle {
			font-size: 1.3em;
			letter-spacing: .24em;
		}
		.cover {
			background-position: 20% 0;
		}
	}

</style>

<svelte:head>
	<title>{ page.data.title[0].text }</title>
</svelte:head>

<content style="--color1: { page.data.main_color }; --color2: { page.data.secondary_color }; --color3: { page.data.tertiary_color } ">
	<div class="cover" style="--image-url: url({ page.data.splash.url })">

	<div class="title-wrapper">
		<h2 class="subtitle">{ page.data.description[0].text }</h2>
		<h1 class="title">{ page.data.title[0].text }</h1>
	</div>

	</div>
</content>
