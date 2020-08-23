<script>
    import { lang } from "../routes/_settings.js";

</script>

<style>
 .langselector {
     position: absolute;
     right: 0;

     padding: 0 1em;
     background-color: rgba(255,255,255,0.6);
 }

 .langselector a {
     font-size: 0.8em;
     line-height: 1.8;
 }
</style>

<div class="langselector-wrapper">
    <div class="langselector">
        {#each $lang.translations as translation, i (translation.url)}
            <a href="/{translation.url}">{ translation.code }</a>
        {/each}
    </div>
</div>
