# Layout & Homepage

Alright, so we have a Next.js project up and running. In this lesson, we're going to look at the layout component and the homepage. We're going to start from scratch so let's completely wipe out the landing page that was created for us and start from scratch.

Start by just deleting the entire contents of the `app` folder. This will of course break our app, but that's ok. We'll fix it in a minute.

## Layout Component

Let's start by re-creating the `layout.jsx` file in the `app` folder. This is where we'll put our main layout component. You can think of this as the entry point of our app and a wrapper component that will wrap all of our pages. So we'll put things like a header and footer in here. We also want to include the `<html>` and `<body>` tags here.

Add the following to the `layout.jsx` file:

```jsx
const MainLayout = () => {
  return (
    <html lang='en'>
      <body>
        <main>MainLayout</main>
      </body>
    </html>
  );
};

export default MainLayout;
```

You may have to restart the server with `npm run dev` for the changes to take effect. Also, if you get any weird errors, try deleting the `.next` folder and restarting the server. This fixes a lot of issues. The `.next` folder is where Next.js stores its cache and build files. It is safe to delete. It will just be re-created when you restart the server.

So you should just see the text "MainLayout" on the page.

Notice that I used the `.jsx` extension instead of `.js`. This is because we're using JSX in this file. You can use either extension, but I like to use `.jsx` for files that contain JSX. If we were using TypeScript, we would use `.tsx`.

Now let's create the homepage. There is a convention to follow for file-based routing. I'll talk more about this in the next video, but for the homepage, you want to name the file either `page.jsx` or `page.js`. I'm going to use `page.jsx`

In this file, create a component/function called `HomePage` and return some JSX. For now, just return a div with the text "HomePage". Then export the component.

```jsx
const HomePage = () => {
  return <div>HomePage</div>;
};

export default HomePage;
```

With page components, you can call them whatever you want, however I like to use the convention of adding the word 'Page' to the end of the component name. So when we create the "Properties" page, we'll call it `PropertiesPage`. This will help us to distinguish between page components and regular components.

This will not show yet because we haven't imported it into the layout component. So let's do that now.

Add the following to the `layout.jsx` file:

```jsx
const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
```

All we did was add a `children` prop and then render it. This will render whatever page/component that we are visiting.

You should now see the text "HomePage" on the page.

I also want to mention that this component/page along with every other component that we create is actually running on the server by default. Next.js uses what are called 'React Server Components' or RSC. In fact, if you add a `console.log` to the `HomePage` component, right above the `return` you will see that it logs in the terminal where the server is running, not in the browser console.

This is great for pages and components that do not need a lot of interactivity. It's also great for SEO because the HTML is generated on the server and sent to the browser. This is different from a regular React app where the HTML is generated in the browser. We can make our components render on the client very easily and I'll show you how to do that later on.

## Tailwind & Global Styles

Notice that we lost our Tailwind styles. This is because we deleted the `globals.css` file.

Let's create a folder in the root called `assets` and in that folder, create a folder called `styles` and then create a file called `globals.css`. This is where we'll put our global styles. We'll also import Tailwind here.

Add the following to the `globals.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now we just need to import it into our layout component. So add the following to the `layout.jsx` file:

```jsx
import '@/assets/styles/globals.css';
```

Notice we used the `@` symbol. This is a special alias that Next.js uses to refer to the root of the project.

Now Tailwind should be working again.

Let's add an h1 tag with a Tailwind class to the `HomePage` component. This will show that Tailwind is working.

```jsx
const HomePage = () => {
  return <h1 className='text-2xl'>HomePage</h1>;
};
```
