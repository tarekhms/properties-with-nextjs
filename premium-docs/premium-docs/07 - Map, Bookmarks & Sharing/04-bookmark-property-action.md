# Bookmark Property Action

Now we are going to add the bookmark functionality. This is pretty simple functionality, but there is actually a lot to it. We need to be able to change the state of the button based on whether or not the property is bookmarked. We also need to be able to add and remove the property from the user's bookmarks. We also need to show a success message when the property is added or removed from the bookmarks. We then need to create a page so the user can see all of the bookmarked listings.

We will start with just having the ability to add and remove the bookmark.

We are going to have an action to add and remove the bookmark. Create a file at `app/actions/bookmarkProperty.js` and set `use server` and add the following imports:

```js
'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
```

Create and export an async function and pass in a property ID param:

```js
async function bookmarkProperty(propertyId) {}

export default bookmarkProperty;
```

## Get User

Get the user from the session and find the user in the database:

```js
await connectDB();

const sessionUser = await getSessionUser();

if (!sessionUser || !sessionUser.userId) {
  return { error: 'User ID is required' };
}

const { userId } = sessionUser;

// Find user in database
const user = await User.findById(userId);
```

## Check If bookmarked

Check if the property is in the users bookmarks:

```js
// Check if property is bookmarked
let isBookmarked = user.bookmarks.includes(propertyId);
```

## Add or Remove Bookmark

Initialize a message variable and check if the user has bookmarked the property. If they have, remove the property from the bookmarks. If they haven't, add the property to the bookmarks:

```js
let message;

if (isBookmarked) {
  // If already bookmarked, remove it
  user.bookmarks.pull(propertyId);
  message = 'Bookmark removed successfully';
  isBookmarked = false;
} else {
  // If not bookmarked, add it
  user.bookmarks.push(propertyId);
  message = 'Bookmark added successfully';
  isBookmarked = true;
}
```

## Save User

Save the user, revalidate path and return the message and isBookmarked:

```js
await user.save();
revalidatePath('/properties/saved', 'page');

return { message, isBookmarked };
```

In the next lesson, we will add the event to call this action.
