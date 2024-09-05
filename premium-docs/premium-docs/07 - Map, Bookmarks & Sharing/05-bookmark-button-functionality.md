# Bookmark Button Functionality

In the last lesson, we created the action to add and remove bookmarks to the users `bookmarks` array in the database. Now we need to hook that to the button.

Open the `components/BookmarkButton.jsx` file and import the `bookmarkProperty` action as well as react toastify:

```js
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import { toast } from 'react-toastify';
```

We need to have an event handler, which means that we need to make this component a client component. So add `use client` to the top of the file:

```jsx
'use client';
```

Add an event handler to the button:

```jsx
<button
  onClick={handleClick}
  className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
>
  <FaBookmark className='mr-2' />
  Bookmark Property
</button>
```

Create the handler function and call the action:

```jsx
const handleClick = async () => {
  bookmarkProperty(property._id).then((res) => {
    if (res.error) return toast.error(res.error);
    toast.success(res.message);
  });
};
```

I used the `.then` method here because it's cleaner in this case in my opinion.

Now you should be able to add and remove the bookmark. Check your user collection and you should see the property id in the bookmarks array.

## Check User

We should make sure the user is logged in before calling the action. Let's get the user from the session. So far, we have only done this in server actions. We can also get the session within client components, however we don't use `getSesionServer`, which is what we use in the utility file. There is a hook we can use called `useSession` from `next-auth/react`. Let's import that:

```js
import { useSession } from 'next-auth/react';
```

Now directly at the top of the `BookmarkButton` function, add the following:

```jsx

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  // ...
```

We are getting the session data and then the user id from the session.

Now, in the `handleClick` function, we can check if the user is logged in:

```jsx
const BookmarkButton = ({ property }) => {
  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }

  // ...
  };
```

Now, try signing out and adding a bookmark. You should see the error message.

In the next lesson, we will create the action to check if the property is bookmarked.
