# Inga Tsernovas Artfolio
This project is lovingly hacked into shape by Farx Studios using the default
[Sapper](https://github.com/sveltejs/sapper) template. Most information on the
site is meant to be dynamically loaded via the Prismic backend service so it
should be fairly easy to fork and adapt the design to your needs. Some things
might still be hard coded in as this was developed in a bit of a rush. All
feedback welcome.


## Getting started

### The Prismic backend
This frontend is meant to be run using Prismic as a backend service. So the
first step is to set up your Prismic service. Refer to the api calls in the
src/routes and src/components to see how to name your Prismic documents. In
essence you need to set up a mainpage, contact and about page as well as a post
type for the project and journal posts.

### Running the artfolio
Once the backend is set up then you can expose it by setting the environment
variable SAPPER_APP_PRISMIC_API. In development you can set it by adding the
api-url to a .env file like so:

```bash
cd my-app
echo 'https://[your prismic project].cdn.prismic.io/api/v2' > .env 
```

Then you install the dependencies and run the development server:
```bash
cd my-app
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and check that everything works.



## Bugs and feedback

Please feel free to open issues or ask questions.
