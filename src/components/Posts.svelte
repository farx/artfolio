<script>
	import PrismicDOM from 'prismic-dom';
	import Post from './Post.svelte';

	export let posts;

	import { lang } from "../routes/_settings.js";

</script>

<style>
	content {
		padding-top: 20vh;
        display: block;
	}
</style>

<content>
    <div class='container'>
        <div class='columns'>
            <div class='column col-8 col-mx-auto'>
                <div class='container'>
                <div class='columns'>
                {#each posts as post}
                    <Post { post } />
                {:else}
                    <p class="column text-center">{ $lang.current.pages.journal.no_posts_blurb }</p>
                {/each}
                </div>
                </div>
            </div>
		</div>
	</div>
</content>
