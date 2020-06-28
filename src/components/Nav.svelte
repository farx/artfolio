<script>
	export let segment;
</script>

<style>
 .navbar {
	 background-color : rgba(123,123,123,0.6)
 }
</style>

<header class="navbar">
	<section class="navbar-section">
		<a class="btn btn-link" rel="prefetch" aria-current="{segment === undefined ? 'page' : undefined}" href="projects">projects</a>
		<a class="btn btn-link" rel="prefetch" aria-current="{segment === 'about' ? 'page' : undefined}" href="journal">journal</a>
	</section>
	{#if segment !== undefined}
	<section class="navbar-center">
		<a class="btn btn-link" aria-current="{segment === undefined ? 'page' : undefined}" href=".">inga</a>
	</section>
	{/if}
	<section class="navbar-section">
		<a class="btn btn-link" aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a>
		<a class="btn btn-link" aria-current="{segment === 'contact' ? 'page' : undefined}" href="contact">contact</a>
	</section>
</header>
