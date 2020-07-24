<script context="module">
</script>

<script>
	export let segment;

    import { lang, toggleLang } from "../routes/_settings.js";

</script>

<style>
 .navbar {
    background-color : rgba(255,255,255,0.6)
 }

 .btn {
    color: #3d4720;
    font-size: 2em;
    font-variant: small-caps;
 }
 .navwrapper {
    position:absolute;
    width: 100%;
    top: 0;
 }

 .main-link {
    color: #cfefff !important;
    font-size: 1.7em;
    line-height: 1.5;
    letter-spacing: .2rem;
    font-variant: normal;
    font-style: italic;
 }

 .langselector {
     float:right;
     padding: 0 1em;
     background-color: rgba(255,255,255,0.6);
 }

 .langselector span {
     font-size: 0.8em;
     line-height: 1.8;
 }

 @media (max-width: 700px) {
    .btn {
        font-size: 1.4em;
    }
    .main-link {
        font-size: 1.6em;
    line-height: 1.7;
    }
 }

 @media (max-width: 600px) {
    .btn {
        font-size: 1.2em;
    }
    .main-link {
        font-size: 1.3em;
    line-height: 2.3;
    }
 }

 @media (max-width: 500px) {
    .btn {
        font-size: 1em;
    }
    .main-link {
        font-size: 1.1em;
    line-height: 2.8;
    }
 }

</style>

<div class="navwrapper">
    <header class="navbar">
        <section class="navbar-section col-5">
            <a class="btn btn-link col-6" rel="prefetch" aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">{ $lang.pages.projects.name }</a>
            <a class="btn btn-link col-6" rel="prefetch" aria-current="{segment === 'journal' ? 'page' : undefined}" href="journal">{ $lang.pages.journal.name }</a>
        </section>
        {#if segment !== undefined}
        <section class="navbar-center">
            <a class="btn btn-link main-link" aria-current="{segment === undefined ? 'page' : undefined}" href=".">inga</a>
        </section>
        {/if}
        <section class="navbar-section col-5">
            <a class="btn btn-link col-6" aria-current="{segment === 'about' ? 'page' : undefined}" href="about">{ $lang.pages.about.name }</a>
            <a class="btn btn-link col-6" aria-current="{segment === 'contact' ? 'page' : undefined}" href="contact">{ $lang.pages.contact.name }</a>
        </section>
    </header>
    <div class="langselector">
            <span on:click={ toggleLang } style="{ $lang.code === 'sv-se' ? 'font-weight:bold;' : '' }" >se</span>
            <span>/</span>
            <span on:click={ toggleLang } style="{ $lang.code === 'en-gb' ? 'font-weight:bold;' : '' }" >en</span>
    </div>
</div>
