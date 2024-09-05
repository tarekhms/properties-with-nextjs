# Client Components & Next Router

In the last lesson, we talked about server vs client components. Up to this point, all of our components have been server components. This is just what the are by default in Next.js. I want to show you how to make a component a client component as well as show you some of the hooks that you can use with the Next router. Because you can only use hooks in client components.

## Making a Component a Client Component

Let's go into the `app/properties/[id]/page.jsx` file and add the following to the top of the file:

```jsx
import { useRouter } from 'next/navigation';
```

Once you save the file, you will get an error that says `Error: useRouter only works in Client Components`. This is because we are trying to use the `useRouter` hook in a server component. You can not use any hook in a server component. Let's change this to a client component.

We do this simply by adding the following to the top of the file:

```jsx
'use client';
```

"use client" is used to declare a boundary between a Server and Client Component modules. This means that by defining a "use client" in a file, all other modules imported into it, including child components, are considered part of the client bundle.

Now the error should go away.

If we do a console log of anything, it will now display in the browser console. It will also display in the terminal, because remember, client-component does not mean client-side only. It just means that the module is part of the JavaScript that is sent to the client.

## useRouter Hook

Now we can use the `useRouter` hook to get the router object. `useRouter` is a hook that gives you access to the router object. The router object has a bunch of functions that you can use to navigate around your application.

Let's add the following to the `PropertyPage` component to initialize the router object:

```jsx
const router = useRouter();
```

Make sure that you put this line in the component/function body.

Let's see what that gives us. Add the following to the `PropertyPage` component:

```jsx
console.log(router);
```

Things have changed since Next 13 was released. You used to import the `useRouter` hook from `next/router`, but now you import it from `next/navigation`. You also used to be able to access things like query strings and the pathname directly from the router object, but now we do that with different hooks. I'll show you how to do that in a second. But let's see what the router object gives us.

We have the following functions:

- replace(): Replace the current page with a new one
- reload(): Reload the current page
- refresh(): Refresh the current page
- fastRefresh(): Refresh the current page (keeping the state)
- push(): Push a new page onto the stack
- back(): Go back to the previous page
- forward(): Go forward to the next page
- prefetch(): Prefetch a page

So let's say that I want to redirect the user to the homepage when they click on the "Back to Home" button. I can do that with the `replace` function. Let's add a temporary button to the `PropertyPage` component:

```jsx
<button className='block bg-blue-100 p-2' onClick={() => router.replace('/')}>
  Back to Home
</button>
```

I could also use the `push` function, but I don't want to add a new page to the stack. I want to replace the current page with the homepage.

You can remove the button.

## useParams Hook

So lets say that we want to get the id of the property from the params. There are a few ways to do that. If you are working within a server component, which this will ultimately be, you can pass a "params" prop. I will show you that after. For now, in a client component, we can do that with the `useParams` hook. Let's import it from `next/navigation`:

```jsx
import { useRouter, useParams } from 'next/navigation';
```

Now we can get the id from the params with the following:

```jsx
const { id } = useParams();
```

Let's log that out:

```jsx
console.log(id);
```

Now if you go to the property page, you should see the id in the console.

## useSearchParams Hook

There may be times where you need to get a query string. Let's say that we want to get the `name` query string from the url. We can do that with the `useSearchParams` hook. Let's import it from `next/navigation`:

```jsx
import { useRouter, useParams, useSearchParams } from 'next/navigation';
```

Add this to the function body:

```jsx
const searchParams = useSearchParams();
```

Now we can get the `name` query string with the following:

```jsx
const name = searchParams.get('name');
```

Let's log that out:

```jsx
console.log(name);
```

## usePathname

The last hook I'll show you from the Next router is the `usePathname` hook. This is used for just that, getting the pathname.

Let's import it from `next/navigation`:

```jsx
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
```

Initialize it and get the path name:

```jsx
const pathname = usePathname();
```

Let's log that out:

```jsx
console.log(pathname);
```

You should see the path name in the console.

Alright, so we don't need any of this at the moment, but I'll be stopping and explaining stuff like this throughout the course. You can bring this component back to the state it was in before we started this lesson:

```jsx
const PropertyPage = () => {
  return <div>PropertyPage</div>;
};
export default PropertyPage;
```

## Getting Params in a Server Component

So let's say that we want to get the id of the property from the params in a server component. We can do that by passing a `params` prop to the component. Let's go to the `app/properties/[id]/page.jsx` file and add the following to the `getServerSideProps` function:

```jsx
const PropertyPage = ({ params }) => {
  console.log(params);
  return <div>PropertyPage {params.id}</div>;
};
export default PropertyPage;
```

As you can see, it's pretty simple to get the params in a server component. You just pass them as a prop.

## Getting Query Strings in a Server Component

Let's say that we want to get the `name` query string from the url in a server component. We can do that by passing a `searchParams` prop to the component. Let's go to the `app/properties/[id]/page.jsx` and add the following:

```jsx
const PropertyPage = ({ searchParams }) => {
  console.log(searchParams);
  return <div>PropertyPage </div>;
};
export default PropertyPage;
```

you will see the `name` query string in the console.

Alright, that's it for this lesson. We can put the `PropertyPage` component back to the way it was before we started this lesson:

```jsx
const PropertyPage = () => {
  return <div>PropertyPage</div>;
};
export default PropertyPage;
```
