
<script>
	import PrismicDOM from 'prismic-dom';
	import { linkResolver } from '../routes/_linkresolver.js';
    export let content;
    export let text_color;
    import { slide } from 'svelte/transition';

    let visible = false;
    let hover = false;

    const toggleImageTextHover = () => {
        hover = !hover;
    }

    const toggleImageText = () => {
        visible = !visible;
    }

</script>

<style>

    .block-img {
        text-align: center;
    }

    .block-img {
        margin: 10vh 0;
	}

    .img-wrapper {
        position:relative;
    }

    img {
		max-width:100%;
		max-height:90vh;
	}


    .alt-text {
        position : absolute;
        bottom: 0;
        width: 100%;
        text-align: left;
        padding: 0 1em;
        text-transform: uppercase;
        font-size: 0.5em;
        letter-spacing: .3em;
        line-height: .1em;
        color: var(--image-text-color);

    }

    iframe {
        display:block;
        margin: 0 auto;
        width: 100% !important;
        height: 80vh !important;
        max-height: 100%;
    }

</style>


{#if content.slice_type === "image_with_credits"}
    <div class="block-img" >
        <span class="img-wrapper" on:mouseover={ toggleImageTextHover } on:click={ toggleImageText } on:mouseout={ toggleImageTextHover } >
            {#if (visible || hover) }
                <span class="alt-text"  style="--image-text-color: { content.primary.image_text_color ? content.primary.image_text_color :  text_color }" transition:slide>
                    {@html PrismicDOM.RichText.asHtml(content.primary.credits, linkResolver) }
                </span>
            {/if}
            <img src="{content.primary.image.url}" alt="{content.primary.image.alt}" >
        </span>
    </div>
{:else}
    {@html PrismicDOM.RichText.asHtml(content.primary.text, linkResolver) }
{/if}
