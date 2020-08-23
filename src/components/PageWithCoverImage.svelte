<script>
	import LangSelector from "./LangSelector.svelte"
	import PrismicDOM from 'prismic-dom';
	import { linkResolver } from '../routes/_linkresolver.js';

    export let page;
    export let translations;

</script>

<style>
	.container {
			background: var(--background-color);
			color: var(--text-color) !important;
	}

	.cover {
		background-size: cover;
		background-image: var(--image-url);
		width: 100%;
	}

	.title {
		font-size: 4em;
		text-align: right;
		font-style: italic;
	}

	.subtitle {
		text-align: right;
	}

	.titlecolumn {
		padding-top: 20vh;
	}
</style>

<LangSelector { translations } />
<content style="--background-color: { page.data.background_color ? page.data.background_color : '#140b05' }; --text-color: { page.data.text_color ? page.data.text_color :  '#e6d6c6' }">
    <div class='container'>
        <div class='columns'>
            <div class='cover' style="--image-url: url({ page.data.splash ? page.data.splash.url : ''});">
                <div class='column col-10 col-mx-auto titlecolumn'>
                    <h1 class='mt-2 title'>{ page.data.title[0].text }</h1>
                    <h2 class='mt-2 subtitle'>{ page.data.subtitle[0] ? page.data.subtitle[0].text : "" }</h2>
                </div>
            </div>
            <div class='column col-8 col-md-11 col-mx-auto'>
                {@html PrismicDOM.RichText.asHtml(page.data.description, linkResolver) }
            </div>
        </div>
    </div>
</content>
