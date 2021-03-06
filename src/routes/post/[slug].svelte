<script context="module">
	import Prismic from 'prismic-javascript';
    import { lang, locales } from "../_settings.js";

	export async function preload(page, session) {
        const { slug } = page.params;

        return Prismic.getApi(process.env.SAPPER_APP_PRISMIC_API)
        .then((api) => {
            return api.query(
                Prismic.Predicates.at('my.post.uid', slug),
                { lang: '*' }
            );
        })
        .then((response) => {
            let post = response.results[0];
            return { post };
        });
	}
</script>

<script>
    import { afterUpdate } from 'svelte';
	export let post;
	import PrismicDOM from 'prismic-dom';
	import { linkResolver } from '../_linkresolver.js';
    import PostElement from "../../components/PostElement.svelte"

    import { goto } from '@sapper/app';

    let text_color = post.data.text_color ? post.data.text_color : '#e6d6c6';
    let background_color = post.data.background_color ? post.data.background_color : '#140b05';

    afterUpdate(() => {
        lang.set({
            current: locales[post.lang],
            translations : post.alternate_languages.map(l => { return { url : "post/" + l.uid, code : l.lang.slice(0,2) }})
    })})

</script>

<style>
 .container {
		background: var(--background-color) !important;
		color: var(--text-color) !important;
 }

 .title {
	 font-size: 4em;
	 font-style: italic;
	 text-align: center;
 }

 .subtitle {
	 margin-bottom: 4em;
 }

 .cover {
	 min-height: 40vh;
 }

@media (max-width: 600px) {
    .title {
        font-size: 3em;
    }
   :global(.cover h2) {
        font-size: 1.2rem;
    }
}

</style>
<svelte:head>
	<title>{post.data.title[0].text}</title>
	<meta property="og:image" content="{ post.data.preview_photo_1.url }" />
    {#if post.data.description.length > 0  }
        <meta property="og:description" content="{ post.data.description[0].text }" />
    {:else}
        <meta property="og:description" content="{ post.data.subtitle[0].text }" />
    {/if}
</svelte:head>


<content style="--background-color: { background_color }; --text-color: { text_color }">
    <div class='container'>
        <div class='columns'>
            <div class='column col-10 col-mx-auto cover'>
                <h1 class='title mt-2'>{ post.data.title[0].text }</h1>
                {#if post.data.description.length > 0  }
                    {@html PrismicDOM.RichText.asHtml(post.data.description, linkResolver) }
                {:else}
                    <h2 class='subtitle mt-2'>{ post.data.subtitle[0].text }</h2>
                {/if}
            </div>
            <div class='column content col-mx-auto col-6 col-lg-8 col-md-10 col-sm-11'>
                {#each post.data.body as content, i (content)}
                    <PostElement { content } { text_color }  />
                {/each}
            </div>
        </div>
    </div>
</content>
