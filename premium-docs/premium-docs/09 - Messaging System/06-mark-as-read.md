# Mark As Read

Now that we can read our messages, we want to be able to mark them as read/unread. This will allow us to keep track of which messages we have read and which we have not. This means that we need to update the database. Each message has a field named `isRead`, which is a boolean value. We will toggle this value when the user clicks the "Mark As Read" button.

## `markMessageAsRead` Action

Create a new file at `app/actions/markMessageAsRead.js` and add `use server` and add the following imports:

```javascript
'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
```

Create an async function that takes in a message ID and export it:

```javascript
async function markMessageAsRead(messageId) {}

export default markMessageAsRead;
```

## Get User and Message

In that function, add the following:

```javascript
await connectDB();

const sessionUser = await getSessionUser();

if (!sessionUser || !sessionUser.user) {
  throw new Error('User ID is required');
}

const { userId } = sessionUser;

const message = await Message.findById(messageId);

if (!message) throw new Error('Message not found');
```

We are connecting to the database, getting the session user, and checking if the user is logged in. We then get the message by its ID.

## Verify Ownership

Add the following code to verify that the user owns the message:

```javascript
// Verify ownership
if (message.recipient.toString() !== userId) {
  return new Response('Unauthorized', { status: 401 });
}
```

## Update Message

Now we will update the message to set the `isRead` field to the opposite of its current value:

```javascript
message.read = !message.read;

revalidatePath('/messages', 'page');

await message.save();

return message.read;
```

## Mark Is Read Button

Now we need to bring that action into the `components/MessageCard.jsx` file and add the button click event to call it. We also will add some state so bring in the `useState` hook as well as react toastify:

```javascript
'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
```

Let's add some state for `isRead` right above the return statement:

```javascript
const [isRead, setIsRead] = useState(message.read);
```

Now for the button, we want to show text depending on the state. We also want to add the click event handler:

```javascript
<button
  onClick={handleReadClick}
  className={`mt-4 mr-3 ${
    isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
  } py-1 px-3 rounded-md`}
>
  {isRead ? 'Mark As New' : 'Mark As Read'}
</button>
```

Now add the handler function above the return statement:

```javascript
const handleReadClick = async () => {
  const read = await markMessageAsRead(message._id);

  setIsRead(read);
  toast.success(`Marked as ${read ? 'read' : 'new'}`);
};
```

We are calling the `markMessageAsRead` function and updating the state of `isRead` and the unread count. We are also showing a toast message to the user.

## New Badge

I also want to add a badge that says "New" if the message is unread. Add the following code above the H2:

```javascript
 {!isRead && (
    <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
      New
    </div>
  )}
```

Now you should be able to toggle the read status of a message and see the badge change.
