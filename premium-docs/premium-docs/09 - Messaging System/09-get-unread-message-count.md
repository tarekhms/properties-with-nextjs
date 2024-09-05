# Get Unread Message Count

Now that we have the context connected to the Navbar component, we can use it to display the number of unread messages. We will create an action to get the unread message count from the server.

Create a new file at `app/actions/getUnreadMessageCount.js` and add the following code:

```javascript
'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;
```

This is a simple action that connects to the database, gets the session user, and then counts the number of unread messages for that user. We are using the `Message` model to query the database with the `countDocuments` method. We are filtering by the recipient ID and the `read` field and returning the count.

## Update The Context

Now we need to use this in the context file. Not only that but we only want this to run if the user is logged in. So we need to also bring in the session.

Add the following imports to the `GlobalContext.js` file:

```javascript
'use client';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect } from 'react';
```

We are going to fetch the unread message count from within the `useEffect` hook. Add the following code to the `GlobalContext.js` file just under the `unreadCount` state and above the return:

```javascript
const { data: session } = useSession();

useEffect(() => {
  if (session && session.user) {
    getUnreadMessageCount().then((res) => {
      if (res.count) setUnreadCount(res.count);
    });
  }
}, [getUnreadMessageCount, session]);
```

We are getting the session and checking if the user is logged in. If they are, we call the `getUnreadMessageCount` action and set the count in the state.

You should now see the real number of unread messages in the Navbar component.

## Updating the Count

If you mark/unmark a message as read or delete a message, the count will not update. We need to update the count when we do these actions.

Remember, we are exporting the `setUnreadCount` function from the context. We can use this function to update the count from anywhere in the app.

Open the `components/MessageCard.jsx` file and import the context:

```javascript
import { useGlobalContext } from '@/context/GlobalContext';
```

Get the `setUnreadCount` function from the context. Add this line right under the `isRead` and `isDeleted` states:

```javascript
const { setUnreadCount } = useGlobalContext();
```

Now we just want to call the `setUnreadCount` function when we mark/unmark a message as read or delete a message. Add the following code to the `markAsRead` and `deleteMessage` functions:

```javascript
const handleReadClick = async () => {
  const read = await markMessageAsRead(message._id);
  setIsRead(read);
  // Add the following line
  setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
  toast.success(`Marked as ${read ? 'read' : 'new'}`);
};

const handleDeleteClick = async () => {
  await deleteMessage(message._id);
  setIsDeleted(true);
  // Add the following line
  setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
  toast.success('Message Deleted');
};
```

We are passing in a function to the `setUnreadCount` function that takes the previous count and either increments or decrements it based on the action. This will update the count in the Navbar component when we mark/unmark a message as read or delete a message.

Now the count will update in real-time when you mark/unmark a message as read or delete a message.

Our messaging system is now complete.
