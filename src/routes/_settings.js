import { writable } from 'svelte/store';

export const locales = {
    "se"  : {
        code : "sv-se",
        pages : {
            projects : { name : "projekt", no_posts_blurb: "inga projekt publicerade ännu..." },
            journal : { name : "blog", no_posts_blurb : "inga publika bloginlägg än..." },
            about : { name : "om" },
            contact : { name : "kontakt"}
        },
        copyright : "Allt innehåll är © Inga Tsernova om inte annat är uttryckligen specificerat."
    },
    "en"  : {
        code : "en-gb",
        pages : {
            projects : { name : "projects", no_posts_blurb: "no public projects yet..."  },
            journal : { name : "journal", no_posts_blurb: "no public posts yet..."  },
            about : { name : "about" },
            contact : { name : "contact"}
        },
        copyright : "All content © Inga Tsernova with all rights reserved unless explicitly specified differently."
    }
}

export const lang = writable(locales["en"]);

export const toggleLang = function () {
    lang.update(l => l.code === "sv-se" ? locales["en"] : locales["se"]);
}

export const setLang = function (langid) {
    lang.set(locales[langid]);
}

