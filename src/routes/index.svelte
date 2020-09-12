<script context="module">
	import Prismic from 'prismic-javascript';

	export async function preload(page, session) {
		return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API).then(function(api) {  return api.query(
			Prismic.Predicates.at('document.type', 'homepage'),
		);
		}).then(function(response) {
			const page = response.results[0];

			return {
				title : page ? page.data.title[0].text : "untitled",
				subtitle : page ? page.data.subtitle[0].text : "unsubtitled",
				splash : page ? page.data.splash.url : "",
			};
		});
	}
</script>

<script>
	export let title;
	export let subtitle;
	export let splash;

	import { lang,locales } from "./_settings.js";
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		lang.update(old => { return { current : old.current, translations: []} } )
	});

</script>

<style>
	.title-wrapper {
		text-align: center;
		margin-top: 25vh;
	}

	.title {
		font-size: 12em;
		letter-spacing: .2em;
		font-style: italic;
		margin-top: -0.46em;
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

	@media (max-width: 600px) {
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
	<title>{ title }</title>
	<meta property="og:image" content="{ splash }" />
	<meta property="og:description" content="{ title } - { subtitle }" />
</svelte:head>

<content>
	<div class="cover" style="--image-url: url({ splash })">
		<div class="title-wrapper">
			<h2 class="subtitle">{ subtitle }</h2>
			<h1 class="title">{ title }</h1>
		</div>
	</div>
</content>
