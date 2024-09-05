# Delete Messages

We want the user to be able to delete messages.

Let's create the action to delete a message. Create a file at `app/actions/deleteMessage.js` and add the following code:

```javascript
'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message Not Found');

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // revalidate cache
  revalidatePath('/messages', 'page');

  await message.deleteOne();
}

export default deleteMessage;
```

This should all look very familiar. We are connecting to the database, getting the session user, and checking if the user is logged in. We then get the message by its ID and then we verify that the user owns the message.

Finally, we revalidate the cache and delete the message.

## Delete Button

Now, in the `MessageCard` component, let's bring the action in:

```javascript
import deleteMessage from '@/app/actions/deleteMessage';
```

We want to have a piece of state to show if the message has been deleted. Add the following to the top of the component under the `isRead` state:

```javascript
const [isDeleted, setIsDeleted] = useState(false);
```

Now add the event handler to the button:

```javascript
<button
  onClick={handleDeleteClick}
  className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
>
  Delete
</button>
```

Now add the following right above the return in the `MessageCard` component:

```javascript
const handleDeleteClick = async () => {
  await deleteMessage(message._id);
  setIsDeleted(true);
  toast.success('Message Deleted');
};

if (isDeleted) {
  return <p>Deleted message</p>;
}
```

Now try and delete the a message. You should see the message change to "Deleted message".
