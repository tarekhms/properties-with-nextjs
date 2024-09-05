# Next.js Features

So we know that we can use Next.js to build different kinds of websites with React. SSR and also statically generated websites. We also have a whole batch of really great features available to us. We'll learn how to use all of theses throughout the course, but I just want to go over them real quick.

- File-Based Routing: With a SPA, we have to install a router and define all of our routes. With Next, we simply create a React component in the `app` folder or `pages` folder for older versions of Next and we go to that route in the browser and it just works. Similar to what we do with html and php files.
- React Server Components: Render components on the server. This is great for SEO and fast load times. It also allows you to use data that you would not want to share in the client such as API keys.
- Data Fetching: You can fetch data from within React Server Components and not have to use a useEffect hook. The page loads in the browser with the data already there.
- Server Actions: Asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications. This is where we'll do alot of our database interactions.
- API Routes: We can also create API routes that run on the server where we can interact with databases and so on. We can handle GET, POST, PUT and DELETE requests and not have to use Express or any other backend framework.
- Environment Variables: Next.js supports environment variables, allowing developers to configure different settings for development, staging, and production environments. We'll have a `.env` file for things like API keys and our MongoDB connection string.
- Customizable Head Tag & Meta Data: Since our pages are server rendered, we can easily add meta tags to the head just by exporting a metadata object. This is great for SEO.
- Image Optimization: Next offers an Image component to use instead of the `<img>` tag to optmize images and utilize things like lazy loading.
- Automatic Code Splitting: Next.js only loads the Javascript and CSS files that are required for that particular page. This gives the users a much faster experience with a nearly instant page load.
- TypeScript Support: Next.js has built-in support for TypeScript, providing static typing and improved developer tooling for type safety.
- CSS Support: There is built-in support for CSS, allowing developers to use CSS modules, CSS-in-JS libraries like styled-components or emotion, or global CSS files. There is also Tailwind integration right out of the box, which is what we'll be using for our project.
- Fast Refresh: Next.js includes Fast Refresh, a feature that enables instant feedback on code changes during development without losing component state.

Another advantage is deployment. You can use a service like Vercel, who are also the creators of Next.js, to host your Next websites. You also have Netlify and other services that let you simply import your Github Repo and they handle the rest.

Those are some of the major features of Next.js.

Now that you know what Next.js is, let's move on and start setting up our dev environment.