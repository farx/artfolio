<script>
	export let segment;
</script>

<style>
 .navbar {
    background-color : rgba(255,255,255,0.6)
 }

 .btn {
    color: #3d4720;
    font-size: 1.5em;
    font-style: italic;
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
 }

 @media (max-width: 600px) {
    .btn {
        font-size: 1em;
    }
    .main-link {
        font-size: 1.3em;
    line-height: 2.1;
    }
 }
</style>

<div class="navwrapper">
    <header class="navbar">
        <section class="navbar-section col-5">
            <a class="btn btn-link col-6" rel="prefetch" aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">projects</a>
            <a class="btn btn-link col-6" rel="prefetch" aria-current="{segment === 'journal' ? 'page' : undefined}" href="journal">journal</a>
        </section>
        {#if segment !== undefined}
        <section class="navbar-center col-2">
            <a class="btn btn-link main-link" aria-current="{segment === undefined ? 'page' : undefined}" href=".">inga</a>
        </section>
        {/if}
        <section class="navbar-section col-5">
            <a class="btn btn-link col-6" aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a>
            <a class="btn btn-link col-6" aria-current="{segment === 'contact' ? 'page' : undefined}" href="contact">contact</a>
        </section>
    </header>
</div>
