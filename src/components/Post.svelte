<script>
    export let post;
</script>

<style>
    .card {
        width: 16em;
        height: 16em;
        margin-bottom: 1em;
        background-color: #e6d6c6;
        background-image: var(--preview-photo-1-url);
        background-position: center 0;
        background-size: cover;
        transition: background-image 1s ease-in-out;
        color: #a7562b !important;
        border-color:  #e6d6c6;
    }
    .card:hover {
        background-image: var(--preview-photo-2-url);
    }
    .post-title {
        width: 16em;
        margin-bottom: 3em;
    }

    .post-title h4 {
        font-style: italic;
        margin-bottom: 0.2em;
    }

    .year {
        font-size: 1em;
    }
</style>

<div class='column col-6 col-md-12'>
    <a rel='prefetch' href='post/{post.uid}'>
    <div class="card p-centered" style="--preview-photo-1-url: url({ post.data.preview_photo_1 ? post.data.preview_photo_1.url : '' }); --preview-photo-2-url: url({ post.data.preview_photo_2 ? post.data.preview_photo_2.url : '' })">
    </div>
    </a>
    <div class="post-title p-centered">
        <a rel='prefetch' href='post/{post.uid}'>
            <h4>{ post.data.title[0].text }</h4>
        </a>
        <p class="year">{ post.data.date ? post.data.date.substring(0,4) : "" }</p>
    </div>
</div>
