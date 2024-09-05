# Check Bookmark Status

We need to have the button display differently depending on if the current property is bookmarked or not. If it is bookmarked, then we want to show a button to remove the bookmark. If it is not bookmarked, then we want to show a button to add the bookmark.

Let's add an `isBookmarked` and `loading` state in the `BookmarkButton` component.

```jsx
const [isBookmarked, setIsBookmarked] = useState(false);
const [loading, setLoading] = useState(true);
```

We need to set this state variable to `true` or `false` depending on if the current property is bookmarked or not.

Replace the current return with the following return statement:

```jsx
return isBookmarked ? (
  <button
    onClick={handleClick}
    className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
  >
    <FaBookmark className='mr-2' /> Remove Bookmark
  </button>
) : (
  <button
    onClick={handleClick}
    className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
  >
    <FaBookmark className='mr-2' /> Bookmark Property
  </button>
);
```

If you manually set the `isBookmarked` state to `true`, then the button should change to red. If you set it to `false`, then the button should change to blue.

Let's make it to that we set this local state when the button is clicked. Add the `setIsBookmarked` to the `bookmarkProperty` block in the `handleClick` function:

```jsx
bookmarkProperty(property._id).then((res) => {
  if (res.error) return toast.error(res.error);
  setIsBookmarked(res.isBookmarked);
  toast.success(res.message);
});
```

## Check Bookmark Status

Let's create an action at `app/actions/checkBookmarkStatus.js` to check if the property is bookmarked. We will use this action to set the `isBookmarked` state.

Here is the code:

```js
'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  // Find user in database
  const user = await User.findById(userId);

  // Check if property is bookmarked
  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;
```

We are getting the user from the session and finding the user in the database. Then we check if the property is bookmarked by checking if the property ID is in the user's bookmarks.

Bring the action into the `BookmarkButton` component and call it in the `useEffect` hook. Also check if the user is there.

```jsx
useEffect(() => {
  if (!userId) {
    setLoading(false);
    return;
  }

  checkBookmarkStatus(property._id).then((res) => {
    if (res.error) toast.error(res.error);
    if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
    setLoading(false);
  });
}, [property._id, userId, checkBookmarkStatus]);
```

I used the `.then` syntax because it's shorter and cleaner in this case. We are checking if the user is logged in and then calling the `checkBookmarkStatus` action to see if the property is bookmarked. If it is, then we set the `isBookmarked` state to `true` and set the loading state to `false`.

Also, add this above the return to show loading if loading:

```jsx
if (loading) return <p className='text-center'>Loading...</p>;
```

Now it should check for the status when the page loads, reflect that in the page and change the button color accordingly. You can then click the button to add or remove the bookmark and it will update the button state accordingly.

The next step is to create a page where the user can see all their bookmarks.
