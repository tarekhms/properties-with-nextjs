# Server Actions

Now we get into a really cool part of Next.js and that is Actions. Server Actions are a recent addition to Next.js and they allow us to run server-side functions in our Next.js app. We have already used server components, which are components that render on the server, but server actions are functions that run on the server and we can essentially do anything we want with them. We can also submit forms directly to an action using the `action` attribute. Just like we can with something like PHP. Actions can also be run within a client component. So they are very flexible and can be used in many different ways. You also aren't limited to using actions with forms. They can be invoked from event handlers and even within a `useEffect` hook.

#### API Routes vs. Actions

I briefly wen over API routes and they are a vital part of Next.js. You can use them to execute server-side code and in the first version of this course, I did all of properties CRUD with API routes. That's a good idea if you need your API exposed so other projects can access it, however, if you're building a single app, actions are a much more efficient and an easier way to go. We can run these functions directly in our Next.js app. We don't need to worry about setting up API routes and making extra HTTP requests.

## Create a Server Action

Let's create a new folder at `app/actions`. This is where all of our actions will go. Create a new file called `addProperty.js`. This will be the action that adds a new property to our database. We will have a single exported async function per file. This is the function that will be run when the action is called.

The very first thing at the top of every action file is `use server`. This will strictly run the function on the server. This is important because we don't want to expose any sensitive information to the client. We don't want to run any server-side code on the client. So we use `use server` to make sure that the function is only run on the server. For now, let's just log a message to the console to make sure that the action is working.

```js
'use server';

async function addProperty() {
  console.log('addProperty action');
}

export default addProperty;
```

Let's now bring this action into our form. Import the action into the `app/components/PropertyAddForm.jsx` file.

```js
import addProperty from '@/app/actions/addProperty';
```

We can actually add the action to the `action` attribute of the form:

```jsx
<form action={addProperty}>
```

I am using a Chrome extension called "Fake Filler" to fill in the form. You can use this or manually type in the fields.

When you submit the form, you should see the message in the server console. This means that the action is working.

Now just to show you that actions can be run on the client, add `use client` to the top of the `PropertyAddForm.jsx` file and create a function in the component called `handleAddProperty` that calls the action.

```jsx
const PropertyAddForm = () => {
  const handleAddProperty = async () => {
    console.log('addProperty action');
  };
//...
```

Add it to the `action` attribute of the form:

```jsx
  <form action={handleAddProperty}>
```

Now when you submit, you will see the log in the browser console.

Let's get rid of the `handleAddProperty` function and change the `action` back to `addProperty`. We can leave the `use client` because this form is going to have a change handler on the image input to make sure there is 4 or less images. It needs to be client side for that. However, the action that we submit to is going to be server side.

## Passing Data to Actions

We need to get the form data in the action. This is simple. We can just pass in `formData` as a parameter to the action. We can then access the form data in the action. Let's log the form data to the console.

```js
'use server';

async function addProperty(formData) {
  console.log(formData.get('name'));
}

export default addProperty;
```

When you submit, you should see the form data in the server console.

In the next lesson, we will format the data to save to the database.
